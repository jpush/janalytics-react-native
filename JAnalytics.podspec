require 'json'
pjson = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|

  s.name            = "JAnalytics"
  s.version         = pjson["version"]
  s.homepage        = pjson["homepage"]
  s.summary         = pjson["description"]
  s.license         = pjson["license"]
  s.author          = pjson["author"]
  
  s.ios.deployment_target = '7.0'

  s.source          = { :git => "https://github.com/jpush/janalytics-react-native.git", :tag => "#{s.version}" }
  s.source_files    = 'ios/RCTJAnalyticsModule/*.{h,m}'
  s.preserve_paths  = "*.js"
  s.frameworks      = 'UIKit','SystemConfiguration','CoreTelephony','CoreGraphics','Security','Foundation','CoreLocation','CoreFoundation','CFNetwork'
  s.libraries       = 'z','resolv','sqlite3'
  s.vendored_libraries = "ios/RCTJAnalyticsModule/*.a"
  s.dependency 'React'
end