
/* mrc内存管理 */

#import <Foundation/Foundation.h>

typedef void(^respondHandler)(NSError *error, NSDictionary* res);

@interface NetStub : NSObject

+ (void) request:(NSDictionary*)opts onRespond:(respondHandler) handler;

@end
