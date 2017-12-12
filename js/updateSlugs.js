/** quando ci sarà più ordine nel js principale questo array sarà da inserire nel manager  **/

/** Gli slug di questo array sono pensati per poter fare le chiamate alle singole stazioni con
*   le API di Torino meteo **/

var slugs = [
  {
  	 id : '140',
  	slug : 'alpe-di-mea',
  	blobId : 'bd777cfa-dc6d-11e7-b106-ed8d7b38d371'
  },
  {
  	 id : '147',
  	slug : 'aosta',
  	blobId : 'bd73fa87-dc6d-11e7-b106-c19165f02265'
  },
  {
  	 id : '74',
  	slug : 'arolla',
  	blobId : 'bd753309-dc6d-11e7-b106-b70817bb0130'
  },
  {
  	 id : '158',
  	slug : 'arona',
  	blobId : 'bd89f391-dc6d-11e7-b106-3fe2615ba717'
  },
  {
  	 id : '112',
  	slug : 'baldissero-torinese',
  	blobId : 'bd7978cc-dc6d-11e7-b106-67c9b182adc7'
  },
  {
  	 id : '2',
  	slug : 'belgirate',
  	blobId : 'bd788e6b-dc6d-11e7-b106-45625aad857b'
  },
  {
  	 id : '118',
  	slug : 'bellinzago-novarese',
  	blobId : 'bd746fb8-dc6d-11e7-b106-c1708401cbb6'
  },
  {
  	 id : '162',
  	slug : 'belvedere-ghiacciaio',
  	blobId : 'bd95b363-dc6d-11e7-b106-1d27af59015a'
  },
  {
  	 id : '88',
  	slug : 'besozzo',
  	blobId : 'bd807daf-dc6d-11e7-b106-e537049547e2'
  },
  {
  	 id : '154',
  	slug : 'bessans',
  	blobId : 'bd7fe16e-dc6d-11e7-b106-679dcfa53a29'
  },
  {
  	 id : '4',
  	slug : 'bielmonte',
  	blobId : 'bd7fba5d-dc6d-11e7-b106-8f6c89ac3c84'
  },
  {
  	 id : '85',
  	slug : 'borgomanero',
  	blobId : 'bda3e438-dc6d-11e7-b106-7d5dfd1f8ac5'
  },
  {
  	 id : '153',
  	slug : 'bosconero',
  	blobId : 'bd962894-dc6d-11e7-b106-0d1de7dea056'
  },
  {
  	 id : '116',
  	slug : 'briga-alta',
  	blobId : 'bd89f390-dc6d-11e7-b106-754f16e86e40'
  },
  {
  	 id : '110',
  	slug : 'bussoleno',
  	blobId : 'bda347f6-dc6d-11e7-b106-7f95495c3311'
  },
  {
  	 id : '24',
  	slug : 'buttigliera-alta',
  	blobId : 'bdae447b-dc6d-11e7-b106-e35dbd288d3b'
  },
  {
  	 id : '41',
  	slug : 'cafasse',
  	blobId : 'bd978825-dc6d-11e7-b106-c51507907184'
  },
  {
  	 id : '67',
  	slug : 'calizzano',
  	blobId : 'bdae1d6a-dc6d-11e7-b106-15938f6e7f58'
  },
  {
  	 id : '138',
  	slug : 'candelo',
  	blobId : 'bdbdfbee-dc6d-11e7-b106-8b669bbf1624'
  },
  {
  	 id : '132',
  	slug : 'carmagnola',
  	blobId : 'bda347f7-dc6d-11e7-b106-cfa0731e7a08'
  },
  {
  	 id : '143',
  	slug : 'casale-monferrato',
  	blobId : 'bd9194b2-dc6d-11e7-b106-7f5533778390'
  },
  {
  	 id : '15',
  	slug : 'castagneto-po',
  	blobId : 'bdbdfbef-dc6d-11e7-b106-e18c730546f7'
  },
  {
  	 id : '169',
  	slug : 'castiglione-torinese',
  	blobId : 'befdf63a-dc6d-11e7-b106-4be836a8eac1'
  },
  {
  	 id : '28',
  	slug : 'cavagnolo',
  	blobId : 'bdc8aa50-dc6d-11e7-b106-3f0959fc165b'
  },
  {
  	 id : '167',
  	slug : 'cerrione',
  	blobId : 'be836efa-dc6d-11e7-b106-b13c9ea47349'
  },
  {
  	 id : '186',
  	slug : 'ceva',
  	blobId : 'be77d61c-dc6d-11e7-b106-ed799b4eb43d'
  },
  {
  	 id : '160',
  	slug : 'chambave',
  	blobId : 'bdd04b73-dc6d-11e7-b106-15d7057c1c2c'
  },
  {
  	 id : '149',
  	slug : 'chamonix',
  	blobId : 'be79d1f0-dc6d-11e7-b106-cfb09e9d02de'
  },
  {
  	 id : '106',
  	slug : 'cirie',
  	blobId : 'be7e17ba-dc6d-11e7-b106-f9382e506926'
  },
  {
  	 id : '145',
  	slug : 'cogne',
  	blobId : 'be81c146-dc6d-11e7-b106-b9859245e583'
  },
  {
  	 id : '188',
  	slug : 'col-del-lys',
  	blobId : 'bdaf07cc-dc6d-11e7-b106-2fc4c7775ecb'
  },
  {
  	 id : '189',
  	slug : 'condove',
  	blobId : 'bdbd389d-dc6d-11e7-b106-c56018623977'
  },
  {
  	 id : '174',
  	slug : 'cortandone',
  	blobId : 'bdcc05b1-dc6d-11e7-b106-e74b4f9915d0'
  },
  {
  	 id : '127',
  	slug : 'curino',
  	blobId : 'be7f7751-dc6d-11e7-b106-95e385119f13'
  },
  {
  	 id : '159',
  	slug : 'domodossola',
  	blobId : 'bddc8076-dc6d-11e7-b106-1fe05abd026e'
  },
  {
  	 id : '37',
  	slug : 'donnas',
  	blobId : 'bdcc2cc2-dc6d-11e7-b106-03862d5f7eda'
  },
  {
  	 id : '179',
  	slug : 'favria',
  	blobId : 'bdd04b74-dc6d-11e7-b106-b7431a7f9f35'
  },
  {
  	 id : '21',
  	slug : 'gap',
  	blobId : 'be82d2b9-dc6d-11e7-b106-eba5e8a5fc7b'
  },
  {
  	 id : '75',
  	slug : 'genova-quezzi',
  	blobId : 'bde273e7-dc6d-11e7-b106-f3d1fc039319'
  },
  {
  	 id : '7',
  	slug : 'giaveno',
  	blobId : 'bddc8075-dc6d-11e7-b106-116f7bc4b447'
  },
  {
  	 id : '136',
  	slug : 'gravellona-toce',
  	blobId : 'be7edb0d-dc6d-11e7-b106-8b6521175227'
  },
  {
  	 id : '124',
  	slug : 'imperia',
  	blobId : 'bf31896b-dc6d-11e7-b106-894c21496c6d'
  },
  {
  	 id : '184',
  	slug : 'lago-dei-sabbioni',
  	blobId : 'be7a9543-dc6d-11e7-b106-ada1831147b7'
  },
  {
  	 id : '65',
  	slug : 'lausanne',
  	blobId : 'bf313b49-dc6d-11e7-b106-3d1882d0a367'
  },
  {
  	 id : '56',
  	slug : 'leysin',
  	blobId : 'bde35e48-dc6d-11e7-b106-3bb909f3db1c'
  },
  {
  	 id : '89',
  	slug : 'loano',
  	blobId : 'be7b0a74-dc6d-11e7-b106-8bcbd3c17c5b'
  },
  {
  	 id : '171',
  	slug : 'malesco',
  	blobId : 'be825d88-dc6d-11e7-b106-53d88875884d'
  },
  {
  	 id : '150',
  	slug : 'masera',
  	blobId : 'be7edb0e-dc6d-11e7-b106-290cb092b329'
  },
  {
  	 id : '40',
  	slug : 'mattie',
  	blobId : 'bf01eddb-dc6d-11e7-b106-1b40ba106ddc'
  },
  {
  	 id : '66',
  	slug : 'mezzana-bigli',
  	blobId : 'be77d61b-dc6d-11e7-b106-f7294cd50814'
  },
  {
  	 id : '172',
  	slug : 'mignanego',
  	blobId : 'beafaf24-dc6d-11e7-b106-897b16640819'
  },
  {
  	 id : '32',
  	slug : 'monasterolo',
  	blobId : 'be840b3b-dc6d-11e7-b106-192cb7533566'
  },
  {
  	 id : '185',
  	slug : 'mondovi',
  	blobId : 'bf481eb1-dc6d-11e7-b106-2f903418b776'
  },
  {
  	 id : '9',
  	slug : 'nichelino',
  	blobId : 'bf0b63c1-dc6d-11e7-b106-19383ac32bb4'
  },
  {
  	 id : '5',
  	slug : 'nole',
  	blobId : 'be80afd4-dc6d-11e7-b106-0745a4514a04'
  },
  {
  	 id : '61',
  	slug : 'occhieppo-superiore',
  	blobId : 'be7760e9-dc6d-11e7-b106-75caf20b0306'
  },
  {
  	 id : '134',
  	slug : 'ollomont',
  	blobId : 'be7d5468-dc6d-11e7-b106-cde3d70ec1f1'
  },
  {
  	 id : '77',
  	slug : 'orcieres',
  	blobId : 'be784b4e-dc6d-11e7-b106-bb4f4c0c54e5'
  },
  {
  	 id : '141',
  	slug : 'ornavasso',
  	blobId : 'be7f021f-dc6d-11e7-b106-e3a7aaf63c46'
  },
  {
  	 id : '152',
  	slug : 'parella',
  	blobId : 'be79d1ef-dc6d-11e7-b106-d3e51d0ef926'
  },
  {
  	 id : '10',
  	slug : 'pecetto',
  	blobId : 'bef829d8-dc6d-11e7-b106-6f63a34c41fb'
  },
  {
  	 id : '130',
  	slug : 'la-thuile',
  	blobId : 'bf0b63c2-dc6d-11e7-b106-7d3d8a7885c2'
  },
  {
  	 id : '72',
  	slug : 'pila',
  	blobId : 'be78243d-dc6d-11e7-b106-2d1972d8e2bd'
  },
  {
  	 id : '42',
  	slug : 'piova-massaia',
  	blobId : 'be7a9542-dc6d-11e7-b106-d13e7b02ded5'
  },
  {
  	 id : '178',
  	slug : 'pont-canavese',
  	blobId : 'be81c145-dc6d-11e7-b106-17cd1a825ff4'
  },
  {
  	 id : '87',
  	slug : 'prayon',
  	blobId : 'bf0b15a0-dc6d-11e7-b106-51e6d0279a63'
  },
  {
  	 id : '164',
  	slug : 'puy-saint-pierre',
  	blobId : 'be8f7cee-dc6d-11e7-b106-0d489018dcb1'
  },
  {
  	 id : '92',
  	slug : 'quiliano',
  	blobId : 'bf0aa06e-dc6d-11e7-b106-4167f144a62e'
  },
  {
  	 id : '170',
  	slug : 'reano-aib',
  	blobId : 'be7e65dc-dc6d-11e7-b106-594aa11db80b'
  },
  {
  	 id : '111',
  	slug : 'rivalba',
  	blobId : 'be7bf4d6-dc6d-11e7-b106-b7908c7cde66'
  },
  {
  	 id : '121',
  	slug : 'rivalta',
  	blobId : 'bf514672-dc6d-11e7-b106-bf892845777c'
  },
  {
  	 id : '17',
  	slug : 'rivoli',
  	blobId : 'beaf6103-dc6d-11e7-b106-85247f89011d'
  },
  {
  	 id : '12',
  	slug : 'rondissone',
  	blobId : 'be7a9541-dc6d-11e7-b106-0b24cea93be2'
  },
  {
  	 id : '122',
  	slug : 'roure',
  	blobId : 'be7e17bb-dc6d-11e7-b106-c120b63b22f5'
  },
  {
  	 id : '151',
  	slug : 'san-giacomo-vercellese',
  	blobId : 'bf617318-dc6d-11e7-b106-5da58682f7b5'
  },
  {
  	 id : '103',
  	slug : 'saint-leger-les-melezes',
  	blobId : 'be7f9e62-dc6d-11e7-b106-776e9623d667'
  },
  {
  	 id : '97',
  	slug : 'saint-veran',
  	blobId : 'bf32c1ed-dc6d-11e7-b106-61128eb5e69a'
  },
  {
  	 id : '157',
  	slug : 'sainte-foy-tarentaise',
  	blobId : 'bf43d8f0-dc6d-11e7-b106-01951f78292b'
  },
  {
  	 id : '19',
  	slug : 'san-paolo-solbrito',
  	blobId : 'be7df0a9-dc6d-11e7-b106-576413f8f365'
  },
  {
  	 id : '13',
  	slug : 'san-salvatore',
  	blobId : 'bf553e14-dc6d-11e7-b106-2f8d8d4c7765'
  },
  {
  	 id : '176',
  	slug : 'santelisabetta',
  	blobId : 'bf0c9c44-dc6d-11e7-b106-cfa7290a7c79'
  },
  {
  	 id : '26',
  	slug : 'sauze-doulx',
  	blobId : 'bef877f9-dc6d-11e7-b106-5d27bd034a45'
  },
  {
  	 id : '91',
  	slug : 'savona',
  	blobId : 'bf0b8ad3-dc6d-11e7-b106-19cbc802a188'
  },
  {
  	 id : '166',
  	slug : 'scalenghe',
  	blobId : 'be7b0a75-dc6d-11e7-b106-49c03f3a6eb9'
  },
  {
  	 id : '68',
  	slug : 'sciez',
  	blobId : 'be820f67-dc6d-11e7-b106-cbb211fe4ba8'
  },
  {
  	 id : '57',
  	slug : 'selonnet',
  	blobId : 'bf313b48-dc6d-11e7-b106-919ed0e25ddd'
  },
  {
  	 id : '29',
  	slug : 'settimo-vittone',
  	blobId : 'bf31fe9c-dc6d-11e7-b106-693009e9507f'
  },
  {
  	 id : '86',
  	slug : 'soriso',
  	blobId : 'bf3029d6-dc6d-11e7-b106-f1ed347dee24'
  },
  {
  	 id : '22',
  	slug : 'susa',
  	blobId : 'beb3cdd6-dc6d-11e7-b106-0d902fa2b7eb'
  },
  {
  	 id : '156',
  	slug : 'susa-regione-polveriera',
  	blobId : 'bf5edb06-dc6d-11e7-b106-d10e5790c088'
  },
  {
  	 id : '43',
  	slug : 'toria',
  	blobId : 'bf30ed27-dc6d-11e7-b106-5f97114d82bc'
  },
  {
  	 id : '177',
  	slug : 'torino-barca-bertolla',
  	blobId : 'be7bf4d7-dc6d-11e7-b106-ada83747447b'
  },
  {
  	 id : '100',
  	slug : 'torino-pietro-giuria',
  	blobId : 'beae76a1-dc6d-11e7-b106-81f443aa5f34'
  },
  {
  	 id : '120',
  	slug : 'torino-parella',
  	blobId : 'be8ee0ad-dc6d-11e7-b106-bb4e18622515'
  },
  {
  	 id : '155',
  	slug : 'torino-pozzo-strada',
  	blobId : 'bf3002c5-dc6d-11e7-b106-17a8a4ca163f'
  },
  {
  	 id : '1',
  	slug : 'torino-regio-parco',
  	blobId : 'be840b3c-dc6d-11e7-b106-79a6173cd37d'
  },
  {
  	 id : '94',
  	slug : 'tortona',
  	blobId : 'beae76a0-dc6d-11e7-b106-a1547c07f9fe'
  },
  {
  	 id : '63',
  	slug : 'trecate',
  	blobId : 'bf617317-dc6d-11e7-b106-fdc1a06325b4'
  },
  {
  	 id : '165',
  	slug : 'treiso',
  	blobId : 'bf3a630e-dc6d-11e7-b106-addc87de1b2d'
  },
  {
  	 id : '129',
  	slug : 'trivero',
  	blobId : 'bf06f6ec-dc6d-11e7-b106-5b12925842fc'
  },
  {
  	 id : '163',
  	slug : 'trovinasse',
  	blobId : 'bf3e5aaf-dc6d-11e7-b106-4be76ecb6a79'
  },
  {
  	 id : '181',
  	slug : 'usseglio',
  	blobId : 'beaeebd2-dc6d-11e7-b106-71519e56ed40'
  },
  {
  	 id : '161',
  	slug : 'val-di-remhes',
  	blobId : 'bf516d83-dc6d-11e7-b106-a7feeeb6fc3e'
  },
  {
  	 id : '123',
  	slug : 'valcasotto',
  	blobId : 'be93748f-dc6d-11e7-b106-d1753dee6287'
  },
  {
  	 id : '142',
  	slug : 'valenza',
  	blobId : 'bf0aa06d-dc6d-11e7-b106-9b9e1ec786c7'
  },
  {
  	 id : '131',
  	slug : 'valtournenche',
  	blobId : 'be7760ea-dc6d-11e7-b106-c179c305191a'
  },
  {
  	 id : '107',
  	slug : 'versoix',
  	blobId : 'bf0ac77f-dc6d-11e7-b106-c18c7a892199'
  },
  {
  	 id : '113',
  	slug : 'villanova-canavese',
  	blobId : 'bf31896a-dc6d-11e7-b106-a3cf55dde0ad'
  },
  {
  	 id : '108',
  	slug : 'villar-focchiardo',
  	blobId : 'be803aa3-dc6d-11e7-b106-db907ccd1d9c'
  },
  {
  	 id : '8',
  	slug : 'villar-perosa',
  	blobId : 'bf5edb05-dc6d-11e7-b106-eb03652664eb'
  },
  {
  	 id : '187',
  	slug : 'villar-perosa-centro',
  	blobId : 'beb04b65-dc6d-11e7-b106-ebec24afa076'
  }
];
