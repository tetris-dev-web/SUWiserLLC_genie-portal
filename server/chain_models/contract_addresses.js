module.exports = {
  activationAddress: "0xb85958319e0332495c9dd5d2881093194ac1772d",
  activeTokenAddress: "0x76100bc60e13fd29939181a78891dd5459175b00",
  crowdsaleAddress: "0x8473832279ba4a318ef8f14dfc67597c4974861d",
  dividendsAddress: "0xc98e83bfd6f736142165f7f17bacbb95513858ab",
  inactiveTokenAddress: "0x7514433191aaa155201309381017f26b9860aeea",
  projectFactoryAddress: "0x5b1ea9b3329a6beb663948d4369d2a245fbaf5d7",
  projectLeaderTrackerAddress: "0xe74c985a3c3643a2850c5262210b92ca0b713ef0",
  votingAddress: "0x46182bfd9abfc8574a690495cd02ad8f0cf07905",
  votingTokenAddress: "0x3b0e3514d4aad88e4e845a27024de5cf06828046",
};

/////  ////////
// Running migration: 2_deploy_contracts.js
// NETWORK ropsten
//   Running step...
//   Replacing ProjectLeaderTracker...
//   ... 0xbbc768aeaf9ddff89e22b5c61a7546e371a5b12b9d19670bfdfc55294d7b9958
//   ProjectLeaderTracker:
//   Replacing VotingToken...
//   ... 0x44cce5f997118eaf1c944431c881919bc64f0e56bcf9712709bda46d6b1754e3
//   VotingToken:
//   Replacing ActiveToken...
//   ... 0x8e39cb7bf2a0120e50d1fd9cf81e5d6cca298e84412c9fbe4d3d1f445510d176
//   ActiveToken:
//   Replacing InactiveToken...
//   ... 0x5f9dc1189108cd9ee835a91ae3fbeaf1c75d74f38e7fce87a0350cc8aaf307c0
//   InactiveToken:
//   Replacing Dividends...
//   ... 0x8c6ed34ded26d1d16c1dfb08f0c69e332913834e28467f742bb576e40db1d4c7
//   Dividends:
//   Replacing Reimbursements...
//   ... 0x938254383acd78cfdcc4f6a1e0305e0b0fd1fb6c94cae2d304b35ef83e1a35e5
//   Reimbursements: 0x76b67758057414168380ac1a74c868933ee074d1
//   Replacing Activation...
//   ... 0x52e0f22f662745fce10761847952dc14fac17afae4a92d8561f2af8c2b1e3405
//   Activation:
//   Replacing Voting...
//   ... 0x72f4f358c2ff25df7faf27b85c0fff9276126e44e621190564ae8742246dc18c
//   Voting:
//   Replacing SeedableCrowdsale...
//   ... 0x7646d67bd6eba9a07ca4190f969f69548a289dc8328768607743c6ce5d479ff3
//   SeedableCrowdsale:
//   Replacing TokenPurchaseHelper...
//   ... 0x47b78d9cab69882ac7d1ec16b66b0168bd18ea1661ea7c380350a2493d39f4cc
//   TokenPurchaseHelper: 0x74be6af54c3800c66bec56fba3bae729f5089f20
//   ... 0x956961fde82e1dd9ced9de776d17ca84b850669d5e04c6d7752c0831943ac08f
//   ... 0x63e42c00bfce32f340a2f6ad49e7693d577deb328b3817fc91b8f527ce5c782a
//   ... 0x8d074c65d4e58c883901dae16c1e259accbf216ec0a5475e11a5f858a9ff3689
//   ... 0xa8953cb7ff05732f4141147b580628c8f6b38a911f94b5f8824ee8359127656f
//   Replacing ProjectFactoryHelper...
//   ... 0xd82a64fe4dc04b8a619be98ec1e86a51c5725601688a293775fa46dd488276d8
//   ... 0xfcf68bcbcf8f3816f221f4faf39425a7e00627cac1ddd3ee7c6ddbcfc3ce6d70
//   ProjectFactoryHelper: 0x604515cde09b29208ec7deb5c4f41ce042d951e3
//   Replacing ProjectFactory...
//   ... 0x6ffc15d6d5def1f73d6cb2d45ff273897d055124e450b233bca56b88094d5953
//   ProjectFactory:
//   ... 0x29f839aaf8e21d0a78db49197a9008868deee384d04edfa490d36d7e13a040c0
//   ... 0x36385b97bdecf24623f445d5c40a9c4eb7d776b3ec5d8a5390b9ea8c288aca69
//   ... 0x7a3ea565c302c7c8b5f15f660314ce44c77a0e45e79482cb0ec405c2e9d0c062
//   ... 0x4a37b5303cbbd2fde32f192ff33c0bf765ed09f87470b90f4c917f3973d0e561
//   ... 0xa0edd30155473811b2ccd53f0831db8cc71c10afd6739333250a1daa2be10d1c
//   ... 0xd52cb97c44fb31e4e9e1fc191493077db3a61e2fc87dfe31734b8bacde7dde7d
//   ... 0x378d048f3c64ac9222e9c4ae610013e9777ad67e7ef86d4b2f5b89ba4a542068
//   ... 0xf3b05916e0a527fbf102189831f6c4436e14678b8e4de471a71757931864c936
// pfh 0x604515cde09b29208ec7deb5c4f41ce042d951e3
//   ... 0x71dd6173bba3111bfc6ca24a968be319d055f6f7d12e414787d911a723f60b60
//   ... 0x523501c7a1372ef9f379d58a2d01ec75130ae4d2e24e932d9ae45858f84eb1f8
//   ... 0x1262685cbc79de47eadc0f95a861618aa086caef397dd01bb8e1381168658349
//   ... 0x92fae86b40db3d313bef7c841bbff44d6a8b0365e0f445f27fc30b905062a2cb
// getting inactive token inst
// setting inactive token inst
// setting inactive token crowdsale key
//   ... 0x2f87264b89f76fd0ca96de506d5559443c78194e91c9664f9a61c2ca10dbad75
// setting inactive token activation key
//   ... 0xa5a043ee983d4bd6890dc80054c72b9b6f6366a5d89b75ee2f754916382ec61f
// getting voting token inst
// setting voting token inst
//   ... 0x11ace7ab9c2437e23824cdeb84d8bcf2735d64286ecdbfe8214b709bb4b7a74e
// setting voting token active token
//   ... 0xf53760bdcf2e39a6ce7c9718c84f9032205ab284e345d5f5b60a522330fd6a2a
// setting voting token inactive token
//   ... 0xcb1da4cc8b67b9ffe7b7a2a3ac69ffc58702f9299382e29e3054247df36c03d3
// getting reimbursements
// setting reimbursements
//   ... 0xe870520f9b147d8985f004ec41241640bf21772b1af36a4818e20b0e830b3fdd
// WE MADE IT!!!
//   ... 0xc5f7bee90b20b68d4bf3a9748ce35868a35dd782c331c0e241a07deaa9b6f368
// p1 0x00cb0e60f48e46dccab969c70aacb3083290c333
//   ... 0x963c245e6a693c29b2d61b8d313b9a4eb1a02f0999023a32d7ef129d2055dfd0
// p2 0x776ec9b45ac96669a1f9c11e0e178871bad4a474
//   ... 0xe0002c898e1005f4415c4e5f892a47dbe1b646b328b17c192c7ca968aa0100e7
// p3 0xe75d58380d74dcdbb8ab35116a06aef3d013d120
//   ... 0x0a39183a45b45134da15cab9625719c35d32fe87175ec34083355c7c578866c5
// p4 0xc975355c4a024f74144c2cbda7bc848033654848
//   ... 0x356641b2739200f4fcbae98ab2c1c8e3a7d886018de5372455f66ea335cc01d8
// p5 0x64fb6a48b44953738c235e0c20786cc231f2e20d
//   ... 0x254aebedc69b6cfd36bd752d5354925c7a7dafa24b3b89582e2319ca50b8f8db
// p6 0x6e8f3e3200650c25af4486a899a37b0d74041af7
// PITCHES COMPLETE
//   ... 0x9ef3fc18e00470b8af032dede37311017ffe49ed3ca35e7ab2fa66de7b73fdb1
//   ... 0xcf3de418d94fb67f22256aecaaf7469353861bafe76b8f64867b442153f9d3ad
//   ... 0x0666157a57fc9b196887cd34777b7f6822194773a5563d742244179db15de35d
//   ... 0x32fac4b29e946efe9ee6e93edc791d983bc60d1ce19dcabe440d1f5ebfea710b
// BUYS COMPLETE
//   ... 0x58873099692828244e3fc403effebbaff44a404a5881f4707805041fa6db783e
//   ... 0xa2dbc6ba05ba2410be46a9868e134be372cb393092ccc9fbbca68b59e94392e8
//   ... 0xa4553ad842c645bf9c13dcb23214030c90c0ac422839712a96e976907714bcf5
//   ... 0x874cf5b1650f5650ae55f7435fbe6e850be2b59c0a6246f92134084d710030f5
//   ... 0xda123b72aac0211cf89fecb64e0891be763825d175550edc99ef1abb198af2d1
// VOTES COMPLETE
//   ... 0x66b4fe06a77761ed09def47f838d9a34da584772156c0e0d2be53f5956f827d8
// TOKENS ACTIVATED
//   ... 0x3da8fd1f45b20d490030c9025f8380304746ec4d9035b5cd8ba3bda7f0a559f4
//   ... 0xce0277de653201204b105768491d7aaaa538df1cda1756ad9b8411089df21a78
//   ... 0xcfbfbc89099f11a9c63f2cdd802a4868fb3376bb103bd30f624eeb4428115815
//   ... 0xe002b1e40d6829246e946ca51669aaee4ce5adecb3d31e8d9be45c7c5b434a55
//   ... 0x5b43c5288a87cec8343a57db3031c860c354dfba880e71960d52fc238875f501
// Saving successful migration to network...
//   ... 0xa9b82433743f4649a27d61b9f0c64f89e82c0e443be4401bbafe8a1c4084168c
// Saving artifacts...

// Deploying ProjectLeaderTracker...
//   ... 0x3f7ae8c93d2a37f7f3a5aba43e28d5159c79d149fd5ac1be18659b5b14bf22b0
//   : 0x32491489558e773c832f0b9118ba082f331d19a1
//   Deploying VotingToken...
//   ... 0x732de9567a186d5be8cc2efc02a179641f39a693e3334a4e85cf0db697c0fe74
//   Deploying ActiveToken...
//   ... 0xebdff5b91f277818ae374423d36fa61bf40070f93a46a8f8d688abdfe082d398
//   ActiveToken:
//   Deploying InactiveToken...
//   ... 0x3bbbd93a6e219c6e2fe68a7281e9945c671b0d5f3f1cac1a8bec76771534ec5c
//   InactiveToken:
//   Deploying Dividends...
//   ... 0xa7aab081c1d61f42ca1e8d6972be0a8c7053bf54751844e53061e3e39f185558
//   Dividends:
//   Deploying Reimbursements...
//   ... 0xdfe88d5a5d4ba7c11d6caca51c01e68ec77b190232b19885fb74896adc26b02a
//   Reimbursements: 0xc9281a0f50570a2c9083f842ab81ce9d712380c2
//   Deploying Activation...
//   ... 0x8ed43e0a377c91ce81ca6c1c4f6bf29cc047f34edf4670f0210604d0678981e3
//   Activation:
//   Deploying Voting...
//   ... 0xb7a4676e59e120fd9553fd85b948ab605cd50477c18409f3f8c372fd1078fea5
//   Voting:
//   Deploying SeedableCrowdsale...
//   ... 0xc95e42eb2dfaca0837ec56e329f4c90aaf6595fd9b92d2a88321048a6067e8bf
//   SeedableCrowdsale: 0x400ce1d71b64bd8d5432f129bf17e5eb4a8374a2
//   Deploying TokenPurchaseHelper...
//   ... 0x308b84b9d9e16439628873223de82867ebb91a560d93933f0684a085caeb9d0f
//   TokenPurchaseHelper: 0xaf7bb71816efcbf218caa157dc10877e01937807
//   ... 0x7f8d15607df4eb1b3ac65b354c3d6272b961d2a5e6a341481f10b025c3702923
//   ... 0x2d340e64245c856801a2db83a90bcdc28164cfe3ea9c4d0f0b976a277b690fde
//   ... 0x343cab39268d8ae015902893baf6e51ea819b6ae34324727ef519b4785d21ed2
//   ... 0x331565ccdff54ff312638654c3426574e4f4d7f1ba718a75179bdbdb4f2baa50
//   ... 0x0ed140d8643f1c039cffeeb47edbd8431fa8086e4c3d32d9e3ac241177cf1626
//   Deploying ProjectFactoryHelper...
//   ... 0x0c8a4e5f518c6165537046ae64d449a84f61bd12692d886424bc44df873dd9c2
//   ProjectFactoryHelper: 0x8cb1229fccc4981a2483639e818796673826d51c
//   Deploying ProjectFactory...
//   ... 0x5b0ab61b464465769434512c936a0b6ab0c6e09bced7cc42a10724824b3761f8
//   ProjectFactory:
//   ... 0xf3458e7d38b467874082a27f86ab3924fc2e6aa4b5ddf382ac4a980a19dec5a7
//   ... 0x2785d172a90b05698c3df3f368032e6e7f286ea3f3ab494e68cd8b4cd3d70d99
//   ... 0x69a7f0a1b4186951caababf34d252f3bd44dc682cc4ab1198456ffddeb20d5f7
//   ... 0x93a90e730746ef1f2ce9d96b84974f78e9e6a8cea436cca866f30e7380b482db
//   ... 0x6a6e35800578a499e6a0eb530ac172d4b12dcec2ae3e64ab3575c42672671b7c
//   ... 0xf811031c7bb0fdb56ac4a865983f43626cee245177a2d641c75b2d2d1866b81a
//   ... 0x6c164f6e2ac5156d9f80482a2f8769ae3fce1b7ca191df962ec05ce6a3e4ebab
//   ... 0x8830cdd880b32f076d1c56772815610fcf5b3c039ecc7fbbed81b6ecfdb7979b
// pfh 0x8cb1229fccc4981a2483639e818796673826d51c
//   ... 0xc3f0aab1e635145b569234af8f9a0e15f8e228f55cf494da81cc3e6d9540b84a
//   ... 0xfd2fc9b1cdb1d05f0fc968ae9402213b23d13b64167597b5427c857c79c307d4
//   ... 0x254f8161d1f8fb360611a509b9ea1c94a659a1b16eadfe675a8c5253d7f592fa
//   ... 0xaf8065425d16c5bae22b2b75cf23ed155c75e485a8a3189df6d6bb24787aada1
// getting inactive token inst
// setting inactive token inst
// setting inactive token crowdsale key
//   ... 0xb3b341c4f354c3b543617801d531d6ba5894e37b5ca44354d54caec51f6716dc
// setting inactive token activation key
//   ... 0x9e0536bd82a5a227d0bb306de80e812378fec645f1d667215e9a5defb4bb099c
// getting voting token inst
// setting voting token inst
//   ... 0xc5cdeac5aac444aa6b78f02f51cab31713553343203ceda08c77a1765fff66d7
// setting voting token active token
//   ... 0xe9271080b159b3f37487080ed1e57d48188c26f9060d175606684a0a39ee3793
// setting voting token inactive token
//   ... 0x32a50134a427f42fba8ca5872ceb37c7c76daab7b8fac7010c6d4effdea8ae7c
// getting reimbursements
// setting reimbursements
//   ... 0x4e00637d15a5fbb2631cbe171f0c477ff49fd0bf65a5277fae4bd76e9ba8de82
// WE MADE IT!!!
//   ... 0xd70837f779bbaa1a31fc348871b27fda46bbd7871fbf619cb35ec0ff0c9a96d7
// p1 0x902b99fe6fbf8c4fcb8ef29b61656b78df215b6a
//   ... 0x3c0a681c6d09ef2db2ed737d2e6182ed6a521fdc019c5f8aceb4369670586d68
// p2 0xe637f370435f82935b40c07e0be6793bc74c4ffb
//   ... 0xba76858c3e10f79602657625501b7fca44c1972e7cd4f5b72ac2d9bba165c483
// p3 0x56cee5ed60669264c1e6cb6e5d9380f7b7395025
//   ... 0x493920eca3ddf915aed3356dcffdbaa29af5247653e8fa0396962134ee566558
// p4 0xeea3aa56a74fe7963a5fa07f713b3d4d9ed33c3a
//   ... 0x99fb530644ec8c5dbee08fd4772ca1e964b16eda636bd8aab4b7f1d739c9b8d3
// p5 0xe0ff5643a8ed8f97b8f9e07ea9be9fe9bfad064a
//   ... 0xd3b67db66fc54a1db2e45e78f7e4287a0e0e2d8694f1d33bd632ef01cd2d47b7
// p6 0x7508d25a33699ce91688db7985a8a81897d9710e
// PITCHES COMPLETE
//   ... 0xa8fbd4fe4ba8e71e9cb6827a2a401ede11f0622a5193851fc1c8fc75107df0fe
//   ... 0xb8a0885c13cddc834672aa64b1fe9f17edcbb39762a2921bfae60fa7e421dc29
//   ... 0x1c6be009e61ae6029ace54d10421b7dfed880e8f9e31eeff0d47aefc785237da
//   ... 0xe5ba2658a66b637fc9e34649e5faec6ffb45ebb01ce98005c4f610b549fd8154
// BUYS COMPLETE
//   ... 0x17e423ca9a2501cdfbdb06f2c06e40ebd057d17d785d27f983156d9b9b6fb812
//   ... 0xb3dfe249819f22442d0353d8669254cdac1d6fddac3b644659bec9dc2ed0613e
//   ... 0xf3c65921d6058efb1ba1540bfca6e34511fda623076cb218b9865b741cda1e70
//   ... 0xd44b7e2be5eac442730979ea3267bd141197fbb904a4c84144f751b5b7b22a63
//   ... 0x9770c8f1767665c386be4108a30bccad8abf9d6e7b5ed8799745a6164e2db094
// VOTES COMPLETE
//   ... 0x16d52f9f12056e614e75b8de970472691a92237352ebcab6acd88962b980172c
// TOKENS ACTIVATED
//   ... 0xc200fd88411f06653e564d87f199c123fee4b80450be77e9e09232fd96b01b30
//   ... 0x83a9f2cbc39d7bb99531b989d600900db9bde618c16e3ccd087c3822eeee0487
//   ... 0x458cc262c6307ee352ed0ffc04ec53ae56328b009f380b360b0714cd153fca3f
//   ... 0xe66a8269a1d6357fc7dbc4266827ea4362e60ba14be6feb5534cf3175e0f0f67
//   ... 0x3814b6fc195fe08fae168d4292ccd96b2811ce2fbb27b348d5d2ff078c238af3
// Saving successful migration to network...
//   ... 0xa57dd86eb949055eb307dd75a58ab0b081789ae7aaf7c263fe780a589ab4833b
// Saving artifacts...

//   Deploying Reimbursements...
//   ... 0xf4a64cd8efed9b515f78bbada571aaee0173431835bd0f280891efc5a3bd429f
//   Reimbursements: 0x78ae60ab4cc2c17d981436d61ce57f2adc212160
//   Deploying Activation...
//   ... 0x8bd80e1013573679b35a364812763d28b2e8dd2b98c93db181004674fd0d0df8
//   Activation: 0xf859f80c094a2bf96761d538c64ac2ee1a46d0df
//   Deploying Voting...
//   ... 0x7088e27aef63e114f482c6699f04213ebc593166348eb50a7d607d8ddd5d1a7f
//   Voting: 0x8405389aebb90e95eb87d2ad39eec56efc0c5b00
//   Deploying SeedableCrowdsale...
//   ... 0x006945f61ff191381c43f8d31b63aeefde90e477c2d91182265a8c738c122187
//   SeedableCrowdsale: 0x9bbf9222f5c27d43972a960c20b6a94b8ee88397
//   Deploying TokenPurchaseHelper...
//   ... 0x7f8c1b1a48a3b9399d004315379688a3c88253e80e3bf9df6182fac1a338545a
//   TokenPurchaseHelper: 0xa7391ab06e6241b29fa8656e08cc16333ebf4847
//   ... 0x37b08467b0a6079e04366a94da2ffeb433011da97d6ccc68f939f429bec2344f
//   ... 0x8f63b1ed7b61a997d29b831acd945a9fc33a4c3adc5f33f432f9a19fb4449fdb
//   ... 0x94b358ec51dd92dd9831ff935bcfd147c69d9f7b378ee4d6c7d7ffb3a0e074ba
//   ... 0xbd9d15c76b4a0d79a67cefa6dcd22fe97abed7494bf01de02988eed69b6f4fed
//   Deploying ProjectFactoryHelper...
//   ... 0xe02afb5edc7f84191da7e963a6ae3cce4640cb0d349a2a0cb18202c8622406c7
//   ... 0x12422f86fd9d650067b005c6c4b18356cea6e73fcb3002aa467897f2d7888f28
//   ProjectFactoryHelper: 0x3fdd45a969b36bb39066cfafbc548fd0baa8bf30
//   Deploying ProjectFactory...
//   ... 0x79da135a0a4a80aa2655469c66193878c7e120b1825044f5a782cdc08169d88b
//   ProjectFactory: 0x37dbf13c02f5f5b032083f104d202a1164df02b2
//   ... 0xf98643630a1a7e1bfe8e26b8614c5235587ba24e78cbb837f9ae57d6b63a5973
//   ... 0xdcd6a78a7b0c6be25963e3b9da5773d975a06e70566fa1486c6f645d231e050b
//   ... 0x15120d67cfa2131e17b10f7a717df09ad30d4d14bb2a755ca141fd00746c2df8
//   ... 0x712ca8cc1e6842386d7765a3a49c0db6fbf93d8b27ef5277cfc750bfefc09db8
//   ... 0xb09281f0696b90b00150b0a3f1fb92b83e3bdc1a3da870e373f5ad75281c5a8a
//   ... 0x35499739a1d085e3f41917f3eef3e4bc18436cd1c1be244e1a58f430b9cc5e11
//   ... 0xc5a1194424c997a0824b4ae8bb803f958287b2fa1abdf04fac734b1c24c8fdca
//   ... 0xc49be9d8a6f879e1cb4da14380538d8e4bb17519ee63d0d24c2585ccd86645f4
// pfh 0x3fdd45a969b36bb39066cfafbc548fd0baa8bf30
//   ... 0xbce21d2028d6899f1cc74f46320ec6fd6f67b2e364dd4ab6bba4d53a0fc9b486
//   ... 0xaf691afac83dd9746618ac46d133885aa6c615b00fb29097b9e48c63c148381f
//   ... 0x00a790839faa181c68d02fddda2d820f3167181452ac7e4fd3ae9322af4d9180
// getting inactive token inst
// setting inactive token inst
// setting inactive token crowdsale key
//   ... 0x7546d804b3f449986fc387e20e6edce5ad9837d4f869a8ec4859b8cfe9c57bc2
// setting inactive token activation key
//   ... 0x6b4c8856f35d6335f910472f5d3b9984ef785aee6e84a8c4448c9849d112be8e
// getting voting token inst
// setting voting token inst
//   ... 0xdafc83b84c339a965fe785fb6831fcddf7bf28b3566db4ea5aafd1c4eb1a96be
// setting voting token active token
//   ... 0x41654d995364f0d5981bf1e84208609a3f33c2636829b4991264318f4b222cd2
// setting voting token inactive token
//   ... 0x3da120db41fa00f896b1e54180079a788196b417e7342815ad395857b2fb0aaf
// getting reimbursements
// setting reimbursements
//   ... 0xf0c2c1757935e6df0bbbb4a3577abb6965009b2c8057fed70e6b44ca2d916330
// WE MADE IT!!!
// Error encountered, bailing. Network state unknown. Review successful transactions manually.

//////////////////////////////////////////////////// local ///////////////////////////////////////////////////
// {
//   activationAddress: "0xb85006d9095b233c9c7eb2f16af23c21f9da34fd",
//   activeTokenAddress: "0xaa82a247b0d0b7407b60753870fc4b2f31d900d6",
//   crowdsaleAddress: "0xc2773530c0ec596e50e0456191fa7c692529d4c2",
//   dividendsAddress: "0x8c8b54c2f7c11ba51352dc218891a3cc3245f0dc",
//   inactiveTokenAddress: "0x0481b7da3c03c0fefd2d4605409464462086917e",
//   projectFactoryAddress: "0x5a366ca75a3b3169099de63cefc1fd7e5a9ea059",
//   projectLeaderTrackerAddress: "0x8b616ded81a8c8d9e30875cf77c24261ed7723f6",
//   votingAddress: "0x5f69e60ca7a927f87b1ed3f80c6c4b2f3b599aec",
//   votingTokenAddress: "0x7d3f22de0b6f9c0ad3922b0d39425a350c421467",
// };
// Running migration: 2_deploy_contracts.js
// NETWORK development
//   Running step...
//   Deploying ProjectLeaderTracker...
//   ... 0x85d823a28f7508d4cf298e3294d03394962a33881688bbfc23746b4a0c812509
//   ProjectLeaderTracker: 0xd4fcdc401a6211ff49bb88a592d1665aeb8910a7
//   Deploying VotingToken...
//   ... 0xbbced4176dfb7eb079f1861496b7aee4f5c948a6030832ca6e5d6ada6b7b0294
//   VotingToken: 0xfd72ad1bbefe9b4e9a0406f9f8d3d0512e297a9b
//   Deploying ActiveToken...
//   ... 0x28f84fa82dc1b9bc419c196c07dea93859c148d6794572963bd090d25467a72d
//   ActiveToken: 0x5def3cb29cb7b344c1621c4cd95ced72c8b0b676
//   Deploying InactiveToken...
//   ... 0x6d3aa895606a1f517da653fe4251c6925f80f1aaebe4b617e210667b92eaecb2
//   InactiveToken: 0x1ac11a7132b2e05fc55ebd8f26ea15128c16bbe2
//   Deploying Dividends...
//   ... 0x80e3a4e638c1f4591320355838ab704532d73aac16d1fc61756f6418f47a874e
//   Dividends: 0x3f447a1f5cbc68b932423add5ec81e574bd49c81
//   Deploying Reimbursements...
//   ... 0x9026b2fd7baaa51ca69c41ae76fc609c0a7a613657518a9336cc82d54354f580
//   Reimbursements: 0xcab1b768ed3b9a43406cd7286ea70c688320f768
//   Deploying Activation...
//   ... 0xfd65e0ac140d9a560a597440e6a59f53722f01d78ef745ad59f406ad308f108f
//   Activation: 0x002fa68b979c97fe33bd51f7409cea1b68a0f262
//   Deploying Voting...
//   ... 0x48232d3e93f7cbee25bdacbb7577cec6e637e8effd9ffebfb67225ecb2c6e78f
//   Voting: 0x0e8fd1378a318144f5d99c9f862eb9c1b070d9a4
//   Deploying GNITokenCrowdsale...
//   ... 0xd175a4f13316cb75c098451eb242a0d683d7924cb7a9fe91f7fa787a04bbd3fc
//   GNITokenCrowdsale: 0xeff2e706e4def71daba1ffd4894922ea03f16c10
//   Deploying TokenPurchaseHelper...
//   ... 0x29455b3308fdab31249ee32b428557b80f6d1fd183284bc753c2d1ca8ab80384
//   TokenPurchaseHelper: 0x15ced2f977afa54f8a9caf63023b034573dbe5db
//   ... 0x406da91ea8a376b1b65e312c579ea88953c87df0fcf77d341ec650d389474a1d
//   ... 0x2c9943ccda89aba2ed3db368d27de2c8d5295243b391e2d92f26476ff77065a3
//   ... 0x0b8e097a61fc922325ee04cb6ff5f0cf1f2ed91fca7cd11c04939c9ecc74fdc0
//   ... 0x4ed21720095d0a9e829eecb5f6bdbcc5e306c6a6b0ee97a966e4eb160452a23b
//   ... 0x4ca13af2c5256dd73cdd29da3ca114790386c84a06f8e10619d7f42474a9011e
//   Deploying ProjectFactoryHelper...
//   ... 0xe4e2b769a3f1e622c931c446344c4e6176ab38c5770f6f03990b88779bc9d883
//   ProjectFactoryHelper: 0x23b182120fb80abbb20fa0af158b177344468c99
//   Deploying ProjectFactory...
//   ... 0x9f0b77784d3b3e02f2a45ee04f4fe54ab7c17c43485aa038ae05cdee6e5bc36f
//   ProjectFactory: 0xa798a80e00185be61d766a170cef12ddc3c7f6d4
//   ... 0x61251fa290977a2915de05abf4c8168dcd8a918af459132fa588dc88ff6dde57
//   ... 0x427e2c53e4312c0071f934ddb7d6118f360cc641d8555af18897461195bd4578
//   ... 0xc38e2ff1819f434d7a8f82d53f43e7d4184d688071e8349a3e47390a3d0440c9
//   ... 0x0cbe24431aee404b9ad4467ed373aaa407f5bab9ff8d0e2c31a08d06476057d1
//   ... 0x3f063e0c43bda19fede663d47d74fdeb42ecdb81d1e18646bacbd525260d8993
//   ... 0x0166ecee0b0456092b78eee69627ebb508a6c3a1e2df8ccf67d45bc21f2dc87b
//   ... 0x3cec51208c6d1b8e5d9edb2864dd42f1cae8a42b314e6f9048448318aaa0aa9e
//   ... 0xcd4c57a686e14b80cce2e0c72cac0f1cfaa92d566d0be298bec6114638b88f7a
// pfh 0x23b182120fb80abbb20fa0af158b177344468c99
//   ... 0xa675ea51f206ed2cade19a025f3ceb586c7b6edb79317068c831546158631b19
//   ... 0xe723b07aa5ee09e54a84a71e1890cc0fb9e2661491c17a9397400ddfee0ee2cd
//   ... 0xd14430f9c4670a6449ad7fc5d026edf2dedff121eb32aeb6300611f120ef4ef0
//   ... 0x7e6f6a9119e747fe6dd547f60fd06308f83fdf67f5ce4d21692b013480d24f36
// getting inactive token inst
// setting inactive token inst
// setting inactive token crowdsale key
//   ... 0xff5087fe669a5ce63a16f9befc2f98a719191668f698829ea80b3a9b421df253
// setting inactive token activation key
//   ... 0x1dc734472868cc362e9f8f69062710fcea38f6e38e56fb2f11e3e355d5dc15a7
// getting voting token inst
// setting voting token inst
//   ... 0xa0f6fc8cfe929c35c83fd775fd3b6868ce4583a9b7f9e014c1de76852c540f97
// setting voting token active token
//   ... 0xac26e4b6a855bebdb26e87fdccc22ec8cdd2e60a8c9300ad5a14f36ab33c5386
// setting voting token inactive token
//   ... 0xe305e2c2c98ea3b9ebc46835a5f55921b3af7d5bf98baa754465d5134f0c56b0
// getting reimbursements
// setting reimbursements
//   ... 0xaa081d1af59bb18366507f9aced3e51f8778a451d473b3cda1adac3eacc8446a
// Saving successful migration to network...
//   ... 0xbd93e5458ef1150fb597e2da0c556810c07254d4256af7eec487e32f05c37481
// Saving artifacts...

// F:\Projects\ownshare-portal\truffle>

//////////////////////////////////////////////////// ropsetn ////////////////////////////////////////////////

// activationAddress: "0x573de900006fda35bbe31a17b1645235a910731b",
// activeTokenAddress: "0x7967b037469f2bfe2b6fb947906780d3cd9d284d",
// crowdsaleAddress: "0xdf1a955d6096bbca54be3c00075dba4f43e2272a",
// dividendsAddress: "0x024fd66bcf141882ba378c30d4087fc7e160cb6a",
// inactiveTokenAddress: "0x03b75746c511a937015d1a73f2da374c84560422",
// projectFactoryAddress: "0xbd348cdc09dc794520d21f935ac5e2c9829e91e4",
// projectLeaderTrackerAddress: "0x7b76022098ceb272e38b96aa9079b24240f76f93",
// votingAddress: "0x68f249a34cce4bc4c62a7c9a3802477d5ecf1f28",
// votingTokenAddress: "0x4f2d3aca156e07f79cbeaa44f90aea67e6451a57",

// Deploying ProjectLeaderTracker...
//   ... 0xcac173161d30d3e79b00ebd9ace3c501a8044e68d82a428c8bab36865bf7e78c
//   ProjectLeaderTracker: 0x7b76022098ceb272e38b96aa9079b24240f76f93
//   Deploying VotingToken...
//   ... 0x519b645e3134873ce7acf981f24280150b4129c28b2a8d42dd2e07df6e32669a
//   VotingToken: 0x4f2d3aca156e07f79cbeaa44f90aea67e6451a57
//   Deploying ActiveToken...
//   ... 0x12ade748fb8051abc827adb92f171c716253aab8bbfb668002be5145c3136d97
//   ActiveToken: 0x7967b037469f2bfe2b6fb947906780d3cd9d284d
//   Deploying InactiveToken...
//   ... 0x4a15c59deddc5aeb49d901dfebcc96c2e29b4e97dda13826eaece29b4baf9445
//   InactiveToken: 0x03b75746c511a937015d1a73f2da374c84560422
//   Deploying Dividends...
//   ... 0x46612870a3547f4092ce1507e0000ac2bfab034ae388c7b4366ff110d3e27aeb
//   Dividends: 0x024fd66bcf141882ba378c30d4087fc7e160cb6a
//   Deploying Reimbursements...
//   ... 0xdadc223cc099b6c53d73e8027db5b11d770fc54ce9cebde0361ad8bcc5de6b75
//   Reimbursements: 0xc7a492fbeb2d094d5a988038c564cea02ab2b71c
//   Deploying Activation...
//   ... 0xc647cc558df942e8b226c9ac5a8fe4e3a59cf37e93347302b9bb532b3257be8c
//   Activation: 0x573de900006fda35bbe31a17b1645235a910731b
//   Deploying Voting...
//   ... 0xcbf46e8cfc0385cd041ee4dffa6b6864d4e437790cc95fe52ef9b59617ae4965
// Error: Invalid JSON RPC response: ""
//     at Object.InvalidResponse (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\web3\node_modules\web3-core-helpers\src\errors.js:42:1)
//     at t.i.onreadystatechange (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\web3\node_modules\web3-providers-http\src\index.js:92:1)
//     at t.e.dispatchEvent (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\xhr2-cookies\dist\xml-http-request-event-target.js:34:1)
//     at t._setReadyState (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\xhr2-cookies\dist\xml-http-request.js:208:1)
//     at t._onHttpRequestError (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\xhr2-cookies\dist\xml-http-request.js:349:1)
//     at ClientRequest.<anonymous> (F:\Projects\ownshare-portal\node_modules\truffle-hdwallet-provider\dist\webpack:\truffle-hdwallet-provider\Users\gnidan\src\work\truffle\node_modules\xhr2-cookies\dist\xml-http-request.js:252:47)
//     at emitOne (events.js:116:13)
//     at ClientRequest.emit (events.js:211:7)
//     at TLSSocket.socketErrorListener (_http_client.js:387:9)
//     at emitOne (events.js:116:13)
//     at TLSSocket.emit (events.js:211:7)
//     at emitErrorNT (internal/streams/destroy.js:64:8)
//     at _combinedTickCallback (internal/process/next_tick.js:138:11)
//     at process._tickCallback (internal/process/next_tick.js:180:9)
//   Voting: 0x68f249a34cce4bc4c62a7c9a3802477d5ecf1f28
//   Deploying SeedableCrowdsale...
//   ... 0x623f8c552f02c8c44bdeb7e68a254b6b9dcbcc7bf5b166da9b28f759df25af17
//   SeedableCrowdsale: 0xdf1a955d6096bbca54be3c00075dba4f43e2272a
//   Deploying TokenPurchaseHelper...
//   ... 0x866a206c5daabe7e0be942b1da02634d00715259dd5bf3b33eece71079964340
//   TokenPurchaseHelper: 0xcebb2e3a9d5edb795a52c4ef0a70407f47fac2ba
//   ... 0xd496fdc7fb355536c2d00104cc2ab5537663f5a26c3ae702285e5921ebade9de
//   ... 0xd334fe06316a1cd1e2ed9f21d19fa6a4ae9ae6c7cff817b176d50cbad065719b
//   ... 0x6ac23f31a64d5389b95c0e6634af592a1d4bba849f3b0b00ef90607f31540e9e
//   ... 0xf9f2f1b24aa2dd0ca6b246b450c05587cd8cabc8c2aca11b4e97aad67a14d942
//   ... 0xedac1b46da767e84459bb9c2517fefe00c702310d1594dfcd480825ed80d238c
//   Deploying ProjectFactoryHelper...
//   ... 0x329f3a16f861b9ba7d20b30e868aebbb098a2e446ee18d8aaaf7794d0449e412
//   ProjectFactoryHelper: 0x4d27246eff42b781cd7feeaae2da6cf054932f8d
//   Deploying ProjectFactory...
//   ... 0xd31dc1f8bdc024310ec100a58293e91a521a7aed07d09190ee9fd434fa809fc1
//   ProjectFactory: 0xbd348cdc09dc794520d21f935ac5e2c9829e91e4
//   ... 0xe433b8c781e8c43f2e0a60cbdaaee120fd085ae3294260d8c7ac1b33b3165842
//   ... 0x22d82685bf57f08acba3487a022986cc4b9109953d3369682a053fab58ff7695
//   ... 0xec9cdfbc50f275d180b5ff2109c0634c155ec460647790e4995727980e97e4af
//   ... 0x2f563ecacdae5a4a81d2a8fa456fa2188fc8f1e32081e8f84032913265aced80
//   ... 0xb3e5652e569926a6013fe38946d2d379d87e0a47671d645405ef51481d982e40
//   ... 0x379e3040a26a64586a8d5832b30eacfc433ef9f5511f59af881e1cf00468cf2d
//   ... 0x96fc2907a8b301160c0fc4b536897d3939af43a731205db501c5aeda4194b874
//   ... 0xe243b83e3a35d3d4efb269491df53281c6780a28e62b8ef24e0058600228353d
// pfh 0x4d27246eff42b781cd7feeaae2da6cf054932f8d
//   ... 0x3d872a3a08269cb3bad73fe194a2bcc7067fc64682913e376a663a7cee5a502b
//   ... 0x6d88043db57314ccd42633d312de1df4deb8fc46e1d4d314679247615f403919
//   ... 0x1f7a0ffaa333b2602ce3851ea17746c87e5111200e2c4961bae5cc2663acb5b5
//   ... 0xc4db6c0eb9772c880eb8c7cf0afdb81fc086af069b14d5278b325a1a04aa0aa5
// getting inactive token inst
// setting inactive token inst
// setting inactive token crowdsale key
//   ... 0xee1d0222fe30dde4a34aaa9ad1c12c1f6c520dcb799d166ed9c1999e42b5ef3b
// setting inactive token activation key
// Error encountered, bailing. Network state unknown. Review successful transactions manually.
// Could not connect to your Ethereum client. Please check that your Ethereum client:
//     - is running
//     - is accepting RPC connections (i.e., "--rpc" option is used in geth)
//     - is accessible over the network
//     - is properly configured in your Truffle configuration file (truffle.js)
