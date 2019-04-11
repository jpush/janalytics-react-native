//
//  RCTJAnalyticsModule.m
//  janalytics
//
//  Created by oshumini on 2017/7/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTJAnalyticsModule.h"
#import "JANALYTICSService.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTEventDispatcher.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTEventDispatcher.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#elif __has_include("React/RCTBridge.h")
#import "React/RCTEventDispatcher.h"
#import "React/RCTRootView.h"
#import "React/RCTBridge.h"
#endif

@implementation RCTJAnalyticsModule

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

+ (id)allocWithZone:(NSZone *)zone {
  static RCTJAnalyticsModule *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (id)init {
  self = [super init];
  return self;
}

RCT_EXPORT_METHOD(setup:(NSDictionary *)param){
  JANALYTICSLaunchConfig * config = [[JANALYTICSLaunchConfig alloc] init];
  NSString *appKey = param[@"appKey"];
  if (appKey != nil && ![appKey isEqualToString:@""]) {
    config.appKey = appKey;
  } else {
    // 如果param 中没有 appKey 这个字段会尝试在 JiGuangConfig.plist 文件中查找这个 appKey。
    NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"JiGuangConfig" ofType:@"plist"];
    
    if (!plistPath) {
      NSLog(@"error: JiGuangConfig.plist not found");
      return;
    }
    
    NSMutableDictionary *fileConfig = [[NSMutableDictionary alloc] initWithContentsOfFile: plistPath];
    if (fileConfig[@"appKey"]) {
      config.appKey = fileConfig[@"appKey"];
    }

  }
  [JANALYTICSService setupWithConfig:config];
}

RCT_EXPORT_METHOD(startLogPageView:(NSDictionary *)param){
  NSString *pageName = @"";
  if (param[@"pageName"]) {
    pageName = param[@"pageName"];
  }
  [JANALYTICSService startLogPageView: pageName];
}

RCT_EXPORT_METHOD(stopLogPageView:(NSDictionary *)param){
  NSString *pageName = @"";
  if (param[@"pageName"]) {
    pageName = param[@"pageName"];
  }
  [JANALYTICSService stopLogPageView: pageName];
}

RCT_EXPORT_METHOD(uploadLocation:(NSDictionary *)param){
  double latitude = 0.0;
  double longitude = 0.0;
  
  if (param[@"latitude"]) {
    NSNumber *latitudeNum = param[@"latitude"];
    latitude = [latitudeNum doubleValue];
  }
  
  if (param[@"latitude"]) {
    NSNumber *latitudeNum = param[@"latitude"];
    latitude = [latitudeNum doubleValue];
  }
  
  [JANALYTICSService setLatitude: latitude longitude: longitude];
}

RCT_EXPORT_METHOD(crashLogON){
  [JANALYTICSService crashLogON];
}

RCT_EXPORT_METHOD(collectCrash:(NSDictionary *)param){
    NSString *name = nil;
    NSString *reason = nil;
    if (param[@"name"]) {
        name = param[@"name"];
    }
    if (param[@"message"]) {
        reason = param[@"message"];
    }
    //NSLog(@"name:%@, reason:%@",name,reason);
    //NSDictionary *info = @{@"error_name":name, @"error_reason":reason};
    NSString *tmp = [NSString stringWithFormat:@"%@: %@", name, reason];
    @throw [NSException exceptionWithName:name reason:tmp userInfo:nil];
}

RCT_EXPORT_METHOD(setDebug:(NSDictionary *)param){
  BOOL enable = false;
  if (param[@"enable"]) {
    NSNumber *enableNum = param[@"enable"];
    enable = [enableNum boolValue];
  }
  [JANALYTICSService setDebug: enable];
}

RCT_EXPORT_METHOD(postEvent:(NSDictionary *)param){
  NSString *type = @"";
  if (param[@"type"]) {
    type = param[@"type"];
  }
  
  if ([type isEqualToString: @"login"]) {
    JANALYTICSLoginEvent *loginEvent = [[JANALYTICSLoginEvent alloc] init];
    
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      loginEvent.extra = extra;
    }
    
    if (param[@"method"]) {
      NSString *method = param[@"method"];
      loginEvent.method = method;
    }
    
    if (param[@"success"]) {
      NSNumber *success = param[@"success"];
      loginEvent.success = [success boolValue];
    }

    [JANALYTICSService eventRecord: loginEvent];
  }
  
  if ([type isEqualToString: @"register"]) {
    JANALYTICSRegisterEvent *registerEvent = [[JANALYTICSRegisterEvent alloc] init];
    
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      registerEvent.extra = extra;
    }
    
    if (param[@"method"]) {
      NSString *method = param[@"method"];
      registerEvent.method = method;
    }
    
    if (param[@"success"]) {
      NSNumber *success = param[@"success"];
      registerEvent.success = [success boolValue];
    }
    [JANALYTICSService eventRecord: registerEvent];
  }
  
  if ([type isEqualToString: @"purchase"]) {
    JANALYTICSPurchaseEvent *purchaseEvent = [[JANALYTICSPurchaseEvent alloc] init];
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      purchaseEvent.extra = extra;
    }
    
    if (param[@"goodsType"]) {
      NSString *goodsType = param[@"goodsType"];
      purchaseEvent.goodsType = goodsType;
    }
    
    if (param[@"goodsId"]) {
      NSString *goodsId = param[@"goodsId"];
      purchaseEvent.goodsID = goodsId;
    }
    
    if (param[@"goodsName"]) {
      NSString *goodsName = param[@"goodsName"];
      purchaseEvent.goodsName = goodsName;
    }
    
    if (param[@"success"]) {
      NSNumber *success = param[@"success"];
      purchaseEvent.success = [success boolValue];
    }
    
    if (param[@"price"]) {
      NSNumber *price = param[@"price"];
      purchaseEvent.price = [price floatValue];
    }
    
    if (param[@"currency"]) {
      NSString *currency = param[@"currency"];
      if ([currency isEqualToString:@"CNY"]) {
        purchaseEvent.currency = JANALYTICSCurrencyCNY;
      }
      
      if ([currency isEqualToString:@"USD"]) {
        purchaseEvent.currency = JANALYTICSCurrencyUSD;
      }
    }
    [JANALYTICSService eventRecord: purchaseEvent];
  }
  
  if ([type isEqualToString: @"browse"]) {

    JANALYTICSBrowseEvent *browseEvent = [[JANALYTICSBrowseEvent alloc] init];
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      browseEvent.extra = extra;
    }
    
    if (param[@"name"]) {
      NSString *name = param[@"name"];
      browseEvent.name = name;
    }
    
    if (param[@"id"]) {
      browseEvent.contentID = param[@"id"];
    }
    
    if (param[@"contentType"]) {
      NSString *contentType = param[@"contentType"];
      browseEvent.type = contentType;
    }
    
    if (param[@"duration"]) {
      NSNumber *duration = param[@"duration"];
      browseEvent.duration = [duration floatValue];
    }
    [JANALYTICSService eventRecord: browseEvent];
  }
  
  if ([type isEqualToString: @"count"]) {
    JANALYTICSCountEvent *countEvent = [[JANALYTICSCountEvent alloc] init];
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      countEvent.extra = extra;
    }
    
    if (param[@"id"]) {
      countEvent.eventID = param[@"id"];
    }
    [JANALYTICSService eventRecord: countEvent];
  }
  
  if ([type isEqualToString: @"calculate"]) {
    JANALYTICSCalculateEvent *calculateEvent = [[JANALYTICSCalculateEvent alloc] init];
    if (param[@"extra"]) {
      NSDictionary *extra = param[@"extra"];
      calculateEvent.extra = extra;
    }
    
    if (param[@"id"]) {
      calculateEvent.eventID = param[@"id"];
    }
    
    if (param[@"value"]) {
      NSNumber *value = param[@"value"];
      calculateEvent.value = [value floatValue];
    }
    [JANALYTICSService eventRecord: calculateEvent];
  }
}

RCT_EXPORT_METHOD(identifyAccount: (NSDictionary *)params
                  success: (RCTResponseSenderBlock)successCallback
                  fail: (RCTResponseSenderBlock)failCallbak){
  
  JANALYTICSUserInfo *userInfo = [[JANALYTICSUserInfo alloc] init];
  userInfo.accountID = params[@"accountID"];
  userInfo.name = params[@"name"];
  userInfo.creationTime = [params[@"creationTime"] doubleValue];
  if ([params[@"sex"] intValue] == 1) {
    userInfo.sex = JANALYTICSSexMale;
  } else if ([params[@"creationTime"] intValue] == 2) {
    userInfo.sex = JANALYTICSSexFemale;
  } else {
    userInfo.sex = JANALYTICSSexUnknown;
  }
  
  if ([params[@"paid"] intValue] == 1) {
    userInfo.paid = JANALYTICSPaidPaid;
  } else if ([params[@"creationTime"] intValue] == 2) {
    userInfo.paid = JANALYTICSPaidUnpaid;
  } else {
    userInfo.paid = JANALYTICSPaidUnknown;
  }
  
  userInfo.birthdate = params[@"birthdate"];
  userInfo.phone = params[@"phone"];
  userInfo.email = params[@"email"];
  userInfo.weiboID = params[@"weiboID"];
  userInfo.wechatID = params[@"wechatID"];
  userInfo.qqID = params[@"qqID"];
  NSDictionary *extras = params[@"extras"];
  for (NSString* key in extras.allKeys) {
    [userInfo setExtraObject:extras[key] forKey:key];
  }
  
  [JANALYTICSService identifyAccount:userInfo with:^(NSInteger err, NSString *msg) {
    
    if (err) {
      failCallbak(@[msg]);
    } else {
      successCallback(@[]);
    }
  }];
}

RCT_EXPORT_METHOD(setAnalyticsReportPeriod: (NSDictionary *)params){
  NSUInteger period = [params[@"period"] unsignedIntegerValue];
  [JANALYTICSService setFrequency:period];
}

@end
