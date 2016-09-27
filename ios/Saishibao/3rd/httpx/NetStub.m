


#import "ASIHTTPRequest.h"
#import "ASIFormDataRequest.h"
#import "NetStub.h"
#import "RCTHttpx.h"

@implementation NetStub


+(id) data2json:(NSData*) data error:(NSError**) error {
  NSError *_error = nil;
  id result = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&_error];
  if (result)
    return result;
  
  if (error)
    *error = _error;
  
  return [NSNull null];
}

+ (void) request:(NSDictionary*)opts onRespond:(respondHandler) handler {
  
  NSString* method = opts[RCTHttpx_opt_method] ? : RCTHttpx_def_method;
  NSURL* url = [NSURL URLWithString:opts[RCTHttpx_opt_url] ? : RCTHttpx_def_url];
  NSDictionary* headers = opts[RCTHttpx_opt_header];
  NSDictionary* post = opts[RCTHttpx_opt_post];
  int timeout = opts[RCTHttpx_opt_timeout] ? [opts[RCTHttpx_opt_timeout] intValue] : RCTHttpx_def_timeout;
  BOOL verifyCert = opts[RCTHttpx_opt_cert] ? [opts[RCTHttpx_opt_cert] boolValue] : RCTHttpx_def_cert;
  
  __block ASIHTTPRequest *request;
  
  if ([method isEqualToString:@"POST"]) {
    request = [[ASIFormDataRequest alloc] initWithURL:url];
    for (NSString* key in post)
      [(id)request addPostValue:post[key] forKey:key];
  }
  else
    request = [[ASIHTTPRequest alloc] initWithURL:url];
  
  for (NSString* key in headers)
    [request addRequestHeader:key value:headers[key]];
  
  [request setTimeOutSeconds:timeout];
  [request setRequestMethod:method];
  [request setDefaultResponseEncoding:NSUTF8StringEncoding];  /* 默认编码 utf-8 */
  //[request addRequestHeader:@"Content-Type" value:@"application/json; charset=utf-8"];
  //[request addRequestHeader:@"Accept" value:@"application/json"];
  [request setValidatesSecureCertificate:verifyCert];
  
  [request setCompletionBlock:^{
    NSDictionary* res = @{@"code":@(request.responseStatusCode),
                          @"raw": request.responseString ? : @"",
                          @"json": [self data2json:request.responseData error:nil],
                          @"headers": request.responseHeaders,
                          @"cookies":request.responseCookies};
    handler(nil, res);
    [request release];
  }];
  
  [request setFailedBlock:^{
    handler(request.error, nil);
    [request release];
  }];
  
  [request startAsynchronous];
}

@end


