#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTBridge.h"
#endif

#import "JANALYTICSService.h"
#import "JANALYTICSEventObject.h"

@interface RCTJAnalyticsModule : NSObject <RCTBridgeModule>

@end
  
