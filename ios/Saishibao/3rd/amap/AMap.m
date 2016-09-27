//
//  CurrentLocationView.m
//  AMapDemo
//
//  Created by zmt on 16/7/5.
//  Copyright © 2016年 zmt. All rights reserved.
//

#import "AMap.h"

#import <AMapSearchKit/AMapSearchKit.h>
#import<AMapFoundationKit/AMapFoundationKit.h>


@interface AMap()<MAMapViewDelegate,AMapSearchDelegate>
{
  MAMapView *_mapView;
}

@end

@implementation AMap

#pragma mark ------- 初始化

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    [self initMapView];
  }
  
  return self;
}


- (void)setAMapKey:(NSString *)AMapKey
{
  _AMapKey = AMapKey;
  [AMapServices sharedServices].apiKey = self.AMapKey;
}


- (void)setAnnotation:(NSDictionary *)annotation
{
  CLLocationDegrees latitude = [annotation[@"latitude"] doubleValue];
  CLLocationDegrees longitude = [annotation[@"longitude"] doubleValue];
  MAPointAnnotation *a = [[MAPointAnnotation alloc] init];
  a.coordinate = (CLLocationCoordinate2D){latitude, longitude};
  a.title      = annotation[@"title"];
  [_mapView addAnnotations:@[a]];
  [_mapView showAnnotations:@[a] animated:NO];
  //[_mapView selectAnnotation:a animated:YES];
}


#pragma mark 创建地图
-(void)initMapView
{
  _mapView = [[MAMapView alloc] initWithFrame:self.bounds];
  _mapView.delegate = self;
  [_mapView setZoomLevel:5.f animated:NO];
  [self addSubview:_mapView];
}


#pragma mark - MAMapViewDelegate

- (MAAnnotationView *)mapView:(MAMapView *)mapView viewForAnnotation:(id<MAAnnotation>)annotation
{
  if ([annotation isKindOfClass:[MAPointAnnotation class]])
  {
    NSLog(@"annotation:%@", annotation);
    static NSString *pointReuseIndetifier = @"pointReuseIndetifier";
    MAPinAnnotationView *annotationView = (MAPinAnnotationView*)[mapView dequeueReusableAnnotationViewWithIdentifier:pointReuseIndetifier];
    if (annotationView == nil)
    {
      annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:pointReuseIndetifier];
    }
    
    annotationView.canShowCallout               = YES;
    annotationView.animatesDrop                 = YES;
    annotationView.draggable                    = YES;
    annotationView.leftCalloutAccessoryView    = [UIButton buttonWithType:UIButtonTypeDetailDisclosure];
    annotationView.pinColor                     = 0;
    
    return annotationView;
  }
  
  return nil;
}

- (void)dealloc
{
  _mapView = nil;
  _mapView.delegate = nil;
}


@end

