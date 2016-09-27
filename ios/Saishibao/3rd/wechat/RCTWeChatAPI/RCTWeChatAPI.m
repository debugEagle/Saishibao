//
//  RCTWeChatAPI.m
//  RCTWeChatAPI
//
//  Created by sb on 1/6/16.
//  Copyright © 2016 erica. All rights reserved.
//


#import "RCTLog.h"
#import "RCTWeChatAPI.h"
#import "WXApi.h"
#import "WXApiObject.h"
#import "RCTEventDispatcher.h"
#import "RCTBridge.h"
#import "RCTImageLoader.h"


#define RCTWXShareTypeNews @"news"
#define RCTWXShareTypeImage @"image"
#define RCTWXShareTypeText @"text"
#define RCTWXShareTypeVideo @"video"
#define RCTWXShareTypeAudio @"audio"

#define RCTWXShareType @"type"
#define RCTWXShareTitle @"title"
#define RCTWXShareText @"text"
#define RCTWXShareDescription @"description"
#define RCTWXShareWebpageUrl @"webpageUrl"
#define RCTWXShareImageUrl @"imageUrl"
#define RCTWXShareThumbImageSize @"thumbImageSize"

#define NOT_REGISTERED (@"registerApp required.")
#define INVOKE_FAILED (@"WeChat API invoke returns false.")

@interface RCTWeChatAPI()<WXApiDelegate>
@end

static NSString *gAppID = @"";
static BOOL gIsAppRegistered = NO;

@implementation RCTWeChatAPI

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
  return @{ @"isAppRegistered":@(gIsAppRegistered)};
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:@"RCTOpenURLNotification" object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}


RCT_REMAP_METHOD(registerWx,
                 registerWx:(RCTResponseSenderBlock)callback)
{
  BOOL b = [self _autoRegisterAPI];
  if (callback) callback(@[@(b)]);
}


RCT_REMAP_METHOD(, isWXAppInstalled:(RCTResponseSenderBlock)callback)
{
  if (callback) callback(@[@([WXApi isWXAppInstalled])]);
}


RCT_REMAP_METHOD(isWXAppSupportApi,
                 isWXAppSupportApi:(RCTResponseSenderBlock)callback)
{
  if (callback) callback(@[@([WXApi isWXAppSupportApi])]);
}


RCT_REMAP_METHOD(getApiVersion,
                 getApiVersion:(RCTResponseSenderBlock)callback)
{
  NSString* res = [WXApi getApiVersion];
  callback(@[res]);
}


RCT_REMAP_METHOD(getWXAppInstallUrl,
                 getWXAppInstallUrl:(RCTResponseSenderBlock)callback)
{
  NSString* res = [WXApi getWXAppInstallUrl];
  callback(@[res]);
}


RCT_REMAP_METHOD(openWXApp,
                 openWXApp:(RCTResponseSenderBlock)callback)
{
  BOOL res = [WXApi openWXApp];
  callback(@[@(res)]);
}


RCT_REMAP_METHOD(sendAuthReq,
                 sendAuthReq:(NSString *)scope :(NSString *)state :(RCTResponseSenderBlock)callback)
{
  SendAuthReq* req = [[SendAuthReq alloc] init];
  req.scope = scope;
  req.state = state;
  BOOL res = [WXApi sendReq:req];
  callback(@[@(res)]);
}


RCT_EXPORT_METHOD(shareToTimeline:(NSDictionary *)data
                  :(RCTResponseSenderBlock)callback)
{
  [self shareToWeixinWithData:data scene:WXSceneTimeline callback:callback];
}


RCT_EXPORT_METHOD(shareToSession:(NSDictionary *)data
                  :(RCTResponseSenderBlock)callback)
{
  [self shareToWeixinWithData:data scene:WXSceneSession callback:callback];
}


RCT_REMAP_METHOD(pay,
                 pay:(NSDictionary *)data :(RCTResponseSenderBlock)callback)
{
  PayReq* req             = [PayReq new];
  req.partnerId           = data[@"partnerid"];
  req.prepayId            = data[@"prepayid"];
  req.nonceStr            = data[@"noncestr"];
  req.timeStamp           = [data[@"timestamp"] intValue];
  req.package             = data[@"package"];
  req.sign                = data[@"sign"];
  NSLog(@"%@", data);
  NSLog(@"%@", req);
  BOOL success = [WXApi sendReq:req];
  callback(@[@(success)]);
}


- (void)handleOpenURL:(NSNotification *)note
{
  NSDictionary *userInfo = note.userInfo;
  NSString *url = userInfo[@"url"];
  [WXApi handleOpenURL:[NSURL URLWithString:url] delegate:self];
}


- (void)shareToWeixinWithData:(NSDictionary *)aData image:(UIImage *)aImage scene:(int)aScene callBack:(RCTResponseSenderBlock)callback
{
  SendMessageToWXReq* req = [SendMessageToWXReq new];
  req.scene = aScene;
  
  NSString *type = aData[RCTWXShareType];
  
  if ([type isEqualToString:RCTWXShareTypeText]) {
    req.bText = YES;
    
    NSString *text = aData[RCTWXShareText];
    if (text && [text isKindOfClass:[NSString class]]) {
      req.text = text;
    }
  }
  else {
    req.bText = NO;
    
    WXMediaMessage* mediaMessage = [WXMediaMessage new];
    
    mediaMessage.title = aData[RCTWXShareTitle];
    mediaMessage.description = aData[RCTWXShareDescription];
    mediaMessage.mediaTagName = aData[@"mediaTagName"];
    mediaMessage.messageAction = aData[@"messageAction"];
    mediaMessage.messageExt = aData[@"messageExt"];
    
    if ([type isEqualToString:RCTWXShareTypeImage]) {
      WXImageObject *imageObject = [WXImageObject new];
      imageObject.imageData = UIImageJPEGRepresentation(aImage, 0.7);
      mediaMessage.mediaObject = imageObject;
    }
    else {
      [mediaMessage setThumbImage:aImage];
      
      if (type.length <= 0 || [type isEqualToString:RCTWXShareTypeNews]) {
        WXWebpageObject* webpageObject = [WXWebpageObject new];
        webpageObject.webpageUrl = aData[RCTWXShareWebpageUrl];
        mediaMessage.mediaObject = webpageObject;
        
        if (webpageObject.webpageUrl.length<=0) {
          callback(@[@"webpageUrl不能为空"]);
          return;
        }
      }
      else if ([type isEqualToString:RCTWXShareTypeAudio]) {
        WXMusicObject *musicObject = [WXMusicObject new];
        musicObject.musicUrl = aData[@"musicUrl"];
        musicObject.musicLowBandUrl = aData[@"musicLowBandUrl"];
        musicObject.musicDataUrl = aData[@"musicDataUrl"];
        musicObject.musicLowBandDataUrl = aData[@"musicLowBandDataUrl"];
        mediaMessage.mediaObject = musicObject;
      }
      else if ([type isEqualToString:RCTWXShareTypeVideo]) {
        WXVideoObject *videoObject = [WXVideoObject new];
        videoObject.videoUrl = aData[@"videoUrl"];
        videoObject.videoLowBandUrl = aData[@"videoLowBandUrl"];
        mediaMessage.mediaObject = videoObject;
      }
    }
    
    req.message = mediaMessage;
  }
  
  BOOL success = [WXApi sendReq:req];
  if (success == NO)
  {
    callback(@[INVOKE_FAILED]);
  }
}


- (void)shareToWeixinWithData:(NSDictionary *)aData scene:(int)aScene callback:(RCTResponseSenderBlock)aCallBack
{
  NSString *imageUrl = aData[RCTWXShareImageUrl];
  if (imageUrl.length && _bridge.imageLoader) {
    CGSize size = CGSizeZero;
    if (![aData[RCTWXShareType] isEqualToString:RCTWXShareTypeImage]) {
      CGFloat thumbImageSize = 80;
      if (aData[RCTWXShareThumbImageSize]) {
        thumbImageSize = [aData[RCTWXShareThumbImageSize] floatValue];
      }
      size = CGSizeMake(thumbImageSize,thumbImageSize);
    }
    [_bridge.imageLoader loadImageWithTag:imageUrl size:size scale:1 resizeMode:UIViewContentModeScaleToFill progressBlock:nil completionBlock:^(NSError *error, UIImage *image) {
      [self shareToWeixinWithData:aData image:image scene:aScene callBack:aCallBack];
    }];
  }
  else {
    [self shareToWeixinWithData:aData image:nil scene:aScene callBack:aCallBack];
  }
}

- (BOOL)_autoRegisterAPI
{
  if (gIsAppRegistered)
    return YES;
  
  NSArray *list = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"CFBundleURLTypes"];
  for (NSDictionary *item in list) {
    NSString *name = item[@"CFBundleURLName"];
    if ([name isEqualToString:@"weixin"]) {
      NSArray *schemes = item[@"CFBundleURLSchemes"];
      if (!schemes || !schemes.count)
        continue;
      gAppID = schemes[0];
      break;
    }
  }
  NSLog(@"_autoRegisterAPI:%@",gAppID);
  gIsAppRegistered = [WXApi registerApp:gAppID];
  return gIsAppRegistered;
}


- (NSString *)_getErrorMsg:(int)code {
  switch (code) {
    case WXSuccess:
      return @"成功";
    case WXErrCodeCommon:
      return @"普通错误类型";
    case WXErrCodeUserCancel:
      return @"用户点击取消并返回";
    case WXErrCodeSentFail:
      return @"发送失败";
    case WXErrCodeAuthDeny:
      return @"授权失败";
    case WXErrCodeUnsupport:
      return @"微信不支持";
    default:
      return @"失败";
  }
}

#pragma mark - wx callback
- (void)onReq:(BaseReq*)req
{
  
}

- (void)onResp:(BaseResp*)resp
{
  NSMutableDictionary *body = @{@"errCode":@(resp.errCode)}.mutableCopy;
  body[@"errCode"] = @(resp.errCode);
  
  if (resp.errStr == nil || resp.errStr.length<=0) {
    body[@"errMsg"] = [self _getErrorMsg:resp.errCode];
  }
  else{
    body[@"errMsg"] = resp.errStr;
  }
  
  if([resp isKindOfClass:[SendMessageToWXResp class]])
  {
    SendMessageToWXResp *r = (SendMessageToWXResp *)resp;
    body[@"lang"] = r.lang;
    body[@"country"] =r.country;
    body[@"type"] = @"SendMessageToWX.Resp";
  }
  else if ([resp isKindOfClass:[SendAuthResp class]]) {
    SendAuthResp *r = (SendAuthResp *)resp;
    body[@"state"] = r.state;
    body[@"lang"] = r.lang;
    body[@"country"] =r.country;
    body[@"type"] = @"WeChat.Resp.Auth";
    body[@"appid"] = gAppID;
    body[@"code"]= r.code;
  }
  else if([resp isKindOfClass:[PayResp class]]) {
    PayResp *r = (PayResp *)resp;
    body[@"appid"] = gAppID;
    body[@"returnKey"] = r.returnKey;
    body[@"type"]= @"WeChat.Resp.Pay";
  }
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"WeChat.Resp" body:body];
}

@end
