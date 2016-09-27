//
//  RCTWeChatAPI.h
//  RCTWeChatAPI
//
//  Created by sn on 1/6/16.
//  Copyright © 2016 erica. All rights reserved.
//

#import "RCTBridgeModule.h"


#define RCTHttpx_opt_url        @"url"
#define RCTHttpx_opt_method     @"method"
#define RCTHttpx_opt_header     @"header"
#define RCTHttpx_opt_timeout    @"timeout"
#define RCTHttpx_opt_post       @"post"
#define RCTHttpx_opt_cert       @"certificate"


#define RCTHttpx_def_timeout    5         /* 默认超时时间 */
#define RCTHttpx_def_method     @"GET"    /* 默认方法 */
#define RCTHttpx_def_url        @""       /* 默认url */
#define RCTHttpx_def_cert       NO        /* 默认不强制验证证书 */

@interface RCTHttpx : NSObject <RCTBridgeModule>

@end
