//
//  RCTWeChatAPI.m
//  RCTWeChatAPI
//
//  Created by sb on 1/6/16.
//  Copyright © 2016 erica. All rights reserved.
//


#import "RCTLog.h"
#import "RCTHttpx.h"
#import "RCTEventDispatcher.h"
#import "RCTBridge.h"
#import "ASIHTTPRequest.h"
#import "ASIFormDataRequest.h"
#import "NetStub.h"


@interface RCTHttpx()

@end


@implementation RCTHttpx


@synthesize bridge = _bridge;


RCT_EXPORT_MODULE(httpx)


- (NSDictionary *)constantsToExport {
  return @{};
}


- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}


- (instancetype)init {
  self = [super init];
  if (self) {
    
  }
  return self;
}


RCT_REMAP_METHOD(request,
                 request:(NSDictionary*)opts respond:(RCTResponseSenderBlock)callback)
{
  [NetStub request:opts onRespond:^(NSError* err, id res) {
    id e = err ? [err localizedDescription] : [NSNull null];
    id v = res ? : [NSNull null];
    callback(@[e, v]);
  }];
}


@end
