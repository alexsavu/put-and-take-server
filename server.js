var restify = require("restify");
var http = require("http");

var mongoose = require('mongoose');

var mongodburl = process.env.MONGOHQ_URL || 'mongodb://localhost/my_database';
// automatically select the right address to connect to either local or remote database
// heroku:764038dc1c92ab3bed90eacf8cc97671@mars.mongohq.com:10046/app9463967
// use this to connect to the mongodb server: mongo mars.mongohq.com:10046/app9463967 -u heroku -p 764038dc1c92ab3bed90eacf8cc97671

mongoose.connect(mongodburl); // use for deployment
console.log("connecting to database server: "+mongodburl);

var Schema = mongoose.Schema;

var Locations = new Schema({
    latitude     : Number
  , longitude    : Number
  , name      	 : String
  , address		 : String
  , phone        : Number
  , price        : Number
});

var Areas = new Schema ({
	name		 : String,
	locations 	 : [Locations]
});

var Area = mongoose.model('Area', Areas);
var Location = mongoose.model('Location', Locations);

server = restify.createServer();
server.use(restify.bodyParser());

var setDefaultHeader = function(res) {
  res.header("Access-Control-Allow-Origin", "*");
  return res.header("Access-Control-Allow-Headers", "X-Requested-With");
};

var getIndex = function(req, res, next) {
  setDefaultHeader(res);
  return res.send("Index");
};

var getAreas = function(req, res, next) {
	setDefaultHeader(res);
	Area.find( function(err, docs){
		res.send(docs);
	} );
};

var newArea = function(req, res, next){
	setDefaultHeader(res);
	var tempArea = new Area();
	tempArea.name = req.params.name || "";
	tempArea.locations = req.params.locations || [];
	tempArea.save();

	res.send(tempArea);
};

var newLocation = function(req, res, next){
	setDefaultHeader(res);
	Area.findOne ({'name': req.params.name}, function(err, doc){
		var tempLoc = new Location();
		tempLoc.latitude = req.params.latitude;
		tempLoc.longitude = req.params.longitude;
		tempLoc.name = req.params.locName;
		doc.locations.push(tempLoc);
		doc.save();

		res.send(doc.locations);
	});

};


var location0 = {};
location0.name = "Bindslev Fiskepark";
location0.latitude = 57.537931;
location0.longitude = 10.226104;
location0.address = "Trynbakkevej 4, 9881 Bindslev";
location0.phone = 20938815;
location0.price = 80;

var location1 = {};
location1.name = "St. Restrup Fiskesø";
location1.latitude = 57.003249;
location1.longitude = 9.777703;
location1.address = "Nibevej 427 St. Restrup, 9240 Nibe";
location1.phone = 98341314;
location1.price = 80;

var location2 = {};
location2.name = "Hirtshals Put & Take";
location2.latitude = 57.572397;
location2.longitude = 9.945116;
location2.address = "Hovedvejen 94, 9850 Hirtshals";
location2.phone = 23617873;
location2.price = 85;

var location3 = {};
location3.name = "Løkken Fiskepark";
location3.latitude = 57.336343;
location3.longitude = 9.70803;
location3.address = "Truslevvej 87, 9480 Løkken";
location3.phone = 98883600;
location3.price = 90;

var location4 = {};
location4.name = "Blokhus Fiskepark";
location4.latitude = 57.210325;
location4.longitude = 9.666188;
location4.address = "Kvorupvej 89, 9490 Pandrup";
location4.phone = 98357088;
location4.price = 90;

var location5 = {};
location5.name = "Dvergetved Søpark";
location5.latitude = 57.480726;
location5.longitude = 10.373712;
location5.address = "Dvergetvedvej 401, 9870 Sindal";
location5.phone = 98485014;
location5.price = 100;

var location6 = {};
location6.name = "Brøndumgaard Fiskesø";
location6.latitude = 56.96455;
location6.longitude = 9.356146;
location6.address = "Ålborgvej 191, 9670 Løgstør";
location6.phone = 98681283;
location6.price = 70;

var location7 = {};
location7.name = "Gunderup Fiskesø";
location7.latitude = 56.824064;
location7.longitude = 9.237936;
location7.address = "Gunderupvej 96, 9640 Farsø";
location7.phone = 98636406;
location7.price = 90;

var location8 = {};
location8.name = "Gølstrup Fiskepark";
location8.latitude = 57.42208;
location8.longitude = 9.811049;
location8.address = "Jelstrupvej, Gølstrup 9480 Løkken";
location8.phone = 98923017;
location8.price = 90;

var location9 = {};
location9.name = "Poulstrup Ørredfiskeri";
location9.latitude = 57.345225;
location9.longitude = 10.019124;
location9.address = "Gønderupvej 10 Poulstrup, 9760 Vrå";
location9.phone = 98988150;
location9.price = 70;

var location10 = {};
location10.name = "Lagunen Fiskepark";
location10.latitude = 57.040636;
location10.longitude = 10.35779;
location10.address = "Lagunen 3, 9370 Hals";
location10.phone = 22250026;
location10.price = 85;

var location11 = {};
location11.name = "Jægerumgård Fiskepark";
location11.latitude = 57.109868;
location11.longitude = 9.564478;
location11.address = "Gl.Kongevej 28, Halvrimmen 9460 Brovst";
location11.phone = 98238981;
location11.price = 80;

var location12 = {};
location12.name = "Revsbæk Put & Take";
location12.latitude = 56.695623;
location12.longitude = 10.112851;
location12.address = "Revsbækvej 8, 9560 Hadsund";
location12.phone = 98572421;
location12.price = 70;

var location13 = {};
location13.name = "Volstrup Fiskepark";
location13.latitude = 56.681694;
location13.longitude = 9.708652;
location13.address = "Rosbjergvej 9 Volstrup, 9500 Hobro";
location13.phone = 98557144;
location13.price = 80;

var location14 = {};
location14.name = "Himmerland Fiskepark";
location14.latitude = 56.955576;
location14.longitude = 9.430282;
location14.address = "Halkærvej 179 Lundby, 9240 Nibe";
location14.phone = 98686257;
location14.price = 90;

var location15 = {};
location15.name = "Gøttrup Fiskepark";
location15.latitude = 57.052472;
location15.longitude = 9.210427;
location15.address = "Gøttrupvej 311C Gøttrup, 9690 Fjerritslev";
location15.phone = 40457233;
location15.price = 100;

var location16 = {};
location16.name = "Møllehallen Put & Take";
location16.latitude = 56.97186;
location16.longitude = 9.945116;
location16.address = "Ferslevvej 1, Dall 9230 Svenstrup J";
location16.phone = 98383424;
location16.price = 75;

var location17 = {};
location17.name = "Teglværkssøen";
location17.latitude = 56.734943;
location17.longitude = 10.15229;
location17.address = "Alsvej 71-73 9560 Hadsund";
location17.phone = 98571451;
location17.price = 70;

var location18 = {};
location18.name = "Tversted Put & Take";
location18.latitude = 57.581049;
location18.longitude = 10.216126;
location18.address = "Skagensvej 80 Tversted, 9881 Bindslev";
location18.phone = 21433470;
location18.price = 70;

var location19 = {};
location19.name = "Hvorupgård Fiskesø";
location19.latitude = 57.112898;
location19.longitude = 9.923315;
location19.address = "Hvorupgårdvej 17, 9400 Nørresundby";
location19.phone = 98297220;
location19.price = 90;

var location20 = {};
location20.name = "Ny Thorup Fiskepark";
location20.latitude = 57.303439;
location20.longitude = 9.93134;
location20.address = "Thorupvej 24, 9700 Brønderslev";
location20.phone = 98822016;
location20.price = 60;

var location21 = {};
location21.name = "Vennebjerg Put & Take";
location21.latitude = 57.468774;
location21.longitude = 9.8489;
location21.address = "Grønne Klitvej, Vennebjerg 9800 Hjørring";
location21.phone = 98968279;
location21.price = 80;

var location22 = {};
location22.name = "Gaaser Fiskesø";
location22.latitude = 57.009311;
location22.longitude = 10.196729;
location22.address = "Sønderskovvej 192,Gaaser, 9362 Gandrup";
location22.phone = 98250186;
location22.price = 80;

var location23 = {};
location23.name = "Nørholm Fiskepark";
location23.latitude = 57.024313;
location23.longitude = 9.734402;
location23.address = "Munkbækvej 22, Mellemholm 9240 Nibe";
location23.phone = 98341480;
location23.price = 70;

var location24 = {};
location24.name = "Serritslev Fiskepark";
location24.latitude = 57.297782;
location24.longitude = 9.959106;
location24.address = "Ågårdsvej 35A Serritslev, 9700 Brønderslev";
location24.phone = 98837154;
location24.price = 100;

var location25 = {};
location25.name = "Medestedet Put & Take";
location25.latitude = 56.759651;
location25.longitude = 9.958591;
location25.address = "Milmosevej 2A 9510 Arden";
location25.phone = 20249275;
location25.price = 85;

var location26 = {};
location26.name = "Kinnerup Put & Take";
location26.latitude = 57.130277;
location26.longitude = 10.076716;
location26.address = "Grindstedvej 2, Uggerhalne 9310 Vodskov";
location26.phone = 21292128;
location26.price = 75;		

var location27 = {};
location27.name = "Fiskepark Nord";
location27.latitude = 57.473008;
location27.longitude = 10.500011;
location27.address = "Skagensvej 164, 9900 Frederikshavn";
location27.phone = 98921660;
location27.price = 100;

var location28 = {};
location28.name = "Tollundgaard Put and Take";
location28.latitude = 56.153558;
location28.longitude = 9.423974;
location28.address = "Tollundvej 3, 8600 Silkeborg";
location28.phone = 86851008;
location28.price = 60;

var areaOne = {};
areaOne.name = "Nordjylland";
areaOne.locations = [];
areaOne.locations.push(location1);
areaOne.locations.push(location2);
areaOne.locations.push(location3);
areaOne.locations.push(location4);
areaOne.locations.push(location5);
areaOne.locations.push(location6);
areaOne.locations.push(location7);
areaOne.locations.push(location8);
areaOne.locations.push(location9);
areaOne.locations.push(location10);
areaOne.locations.push(location11);
areaOne.locations.push(location12);
areaOne.locations.push(location13);
areaOne.locations.push(location14);
areaOne.locations.push(location15);
areaOne.locations.push(location16);
areaOne.locations.push(location17);
areaOne.locations.push(location18);
areaOne.locations.push(location19);
areaOne.locations.push(location20);
areaOne.locations.push(location21);
areaOne.locations.push(location22);
areaOne.locations.push(location23);
areaOne.locations.push(location24);
areaOne.locations.push(location25);
areaOne.locations.push(location26);
areaOne.locations.push(location27);
areaOne.locations.push(location28);

//Can't find location
var location29 = {};
location29.name = "Bakkesøen";
location29.latitude = 55.849277;
location29.longitude = 9.279456;
location29.address = "Lille Donnerupvej 3, 7323 Give";
location29.phone = 75732884;
location29.price = 100;

var location30 = {};
location30.name = "Billund Lystfiskersø";
location30.latitude = 55.732656;
location30.longitude = 9.068313;
location30.address = "Løvlundvej 9, Løvlund, 7190 Billund";
location30.phone = 75338266;
location30.price = 60;

//Can't find location'
var location31 = {};
location31.name = "Bregnholm Mølle";
location31.latitude = 55.912056;
location31.longitude = 9.586215;
location31.address = "Brædstrupvej 72, 7160 Tørring";
location31.phone = 75763107;
location31.price = 100;

var location32 = {};
location32.name = "Djurs Fiskepark";
location32.latitude = 56.400379;
location32.longitude = 10.71034;
location32.address = "Kanalvej 90 Fannerup, 8560 Kolind";
location32.phone = 86332606;
location32.price = 90;

var location33 = {};
location33.name = "Fyel Moses Fiskepark";
location33.latitude = 55.98195;
location33.longitude = 9.705842;
location33.address = "Birknæsvej 7, 8752 Østbirk";
location33.phone = 75781572;
location33.price = 70;

var location34 = {};
location34.name = "Gl Laven lake Grumstrup";
location34.latitude = 56.130879;
location34.longitude = 9.699318;
location34.address = "Puksøvej 1, Gl Laven, 8600 Silkeborg";
location34.phone = 86531272;
location34.price = 100;

var location35 = {};
location35.name = "Hammelevgård Ørredvand";
location35.latitude = 56.454642;
location35.longitude = 10.928671;
location35.address = "Grønnevej 7, 8500 Grenå";
location35.phone = 86327723;
location35.price = 70;

var location36 = {};
location36.name = "Harlev Put & Take";
location36.latitude = 56.136511;
location36.longitude = 10.020797;
location36.address = "Højbyvej 9, 8462 Harlev";
location36.phone = 86941212;
location36.price = 90;

var location37 = {};
location37.name = "Jelling Put & Take";
location37.latitude = 55.739518;
location37.longitude = 9.413245;
location37.address = "Fårupvej 40, 7300 Jelling";
location37.phone = 24628482;
location37.price = 80;

var location38 = {};
location38.name = "Juelsminde Put & Take";
location38.latitude = 55.708533;
location38.longitude = 9.994555;
location38.address = "Toft Road, 7130 Juelsminde";
location38.phone = 75693313;
location38.price = 80;

var location39 = {};
location39.name = "Lundum lystfiskersø";
location39.latitude = 55.929563;
location39.longitude = 9.766867;
location39.address = "Torpvej 64 Lundum, 8700 Horsens";
location39.phone = 40178144;
location39.price = 85;

var location40 = {};
location40.name = "Lystfisker Oasen";
location40.latitude = 56.23573;
location40.longitude = 9.60705;
location40.address = "Gjermosevej 15, Grauballe 8600 Silkeborg";
location40.phone = 60926790;
location40.price = 90;

var location41 = {};
location41.name = "Lystfiskerparadiset Heden";
location41.latitude = 55.642639;
location41.longitude = 9.267333;
location41.address = "Spjarupvej 11, Spjarup, 6040 Egtved";
location41.phone = 22513147;
location41.price = 80;

var location42 = {};
location42.name = "Nebbemølle Put & Take";
location42.latitude = 55.631158;
location42.longitude = 9.715197;
location42.address = "Nebbe Møllevej 106, Gårslev";
location42.phone = 20969027;
location42.price = 90;

var location43 = {};
location43.name = "Nørhoved Put & Take";
location43.latitude = 55.990821;
location43.longitude = 9.409039;
location43.address = "Nørhovedvej 16, 8766 Nr.Snede";
location43.phone = 75771025;
location43.price = 50;

//Can't find location
// var location44 = {};
// location44.name = "Markusminde fiskesø";
// location44.latitude = 55.783958;
// location44.longitude = 8.218857;
// location44.address = "Hovvejen 41, Markusminde 8471 Sabro";
// location44.phone = 75250275;

var location45 = {};
location45.name = "Moesholm Put & Take";
location45.latitude = 56.359462;
location45.longitude = 10.479755;
location45.address = "Thorsagervej 32D 8550 Ryomgård";
location45.phone = 40795215;
location45.price = 110;

var location46 = {};
location46.name = "Palsgaards Lystfiskeri";
location46.latitude = 55.618328;
location46.longitude = 9.772661;
location46.address = "Bøgeskovvej 64,Trelde, 7000 Fredericia";
location46.phone = 75957090;
location46.price = 70;

var location47 = {};
location47.name = "Pinds Mølle Fiskepark";
location47.latitude = 56.109815;
location47.longitude = 10.011356;
location47.address = "Pinds Møllevej 35, 8362 Hørning";
location47.phone = 86923340;
location47.price = 75;

var location48 = {};
location48.name = "Præsteengsøer Put & Take";
location48.latitude = 55.775016;
location48.longitude = 9.226434;
location48.address = "Præsteengvej 2, Lindeballe, 7323 Give";
location48.phone = 21423004;
location48.price = 80;

var location49 = {};
location49.name = "Seest Møllesø Fiskepark";
location49.latitude = 55.489152;
location49.longitude = 9.401958;
location49.address = "Vranderupvej 71 6000 Kolding";
location49.phone = 75526020;
location49.price = 55;

var location50 = {};
location50.name = "Singelsbjerg Sø";
location50.latitude = 56.176055;
location50.longitude = 9.670994;
location50.address = "Skellerupvej 42, 8600 Silkeborg";
location50.phone = 86853096;
location50.price = 60;

var location51 = {};
location51.name = "Skovhave Lystfiskersø";
location51.latitude = 55.381049;
location51.longitude = 9.51386;
location51.address = "Vejstruprødvej 39, 6093 Sjølund";
location51.phone = 75574277;
location51.price = 60;

var location52 = {};
location52.name = "Hedensted Put & Take";
location52.latitude = 55.778045;
location52.longitude = 9.707837;
location52.address = "Mørtelvej 5, 8722 Hedensted";
location52.phone = 75890000;
location52.price = 90;

var location53 = {};
location53.name = "Stenvad Put & Take";
location53.latitude = 55.514965;
location53.longitude = 9.377024;
location53.address = "Stenvad 3, 6000 Kolding";
location53.phone = 51783017;
location53.price = 100;

var location54 = {};
location54.name = "Stilbjerg Lystfiskersø";
location54.latitude = 55.771299;
location54.longitude = 9.104426;
location54.address = "Stilbjergvej 11, 7190 Billund";
location54.phone = 75344104;
location54.price = 65;

var location55 = {};
location55.name = "Svejstrup Fiskepark";
location55.latitude = 56.346895;
location55.longitude = 9.964514;
location55.address = "Svejstrupvej, 8370 Hadsten";
location55.phone = 40983328;
location55.price = 60;

var location56 = {};
location56.name = "Vrads Put & Take";
location56.latitude = 56.047392;
location56.longitude = 9.474399;
location56.address = "Dambrugsvej 3, 8654 Bryrup";
location56.phone = 75756856;
location56.price = 80;


var areaTwo = {};
areaTwo.name = "Østjylland";
areaTwo.locations = [];
areaTwo.locations.push(location30);
areaTwo.locations.push(location32);
areaTwo.locations.push(location33);
areaTwo.locations.push(location34);
areaTwo.locations.push(location35);
areaTwo.locations.push(location36);
areaTwo.locations.push(location37);
areaTwo.locations.push(location38);
areaTwo.locations.push(location39);
areaTwo.locations.push(location40);
areaTwo.locations.push(location41);
areaTwo.locations.push(location42);
areaTwo.locations.push(location43);
areaTwo.locations.push(location45);
areaTwo.locations.push(location46);
areaTwo.locations.push(location47);
areaTwo.locations.push(location48);
areaTwo.locations.push(location49);
areaTwo.locations.push(location50);
areaTwo.locations.push(location51);
areaTwo.locations.push(location52);
areaTwo.locations.push(location53);
areaTwo.locations.push(location54);
areaTwo.locations.push(location55);
areaTwo.locations.push(location56);

var location57 = {};
location57.name = "Adsbøl Sø";
location57.latitude = 55.783958;
location57.longitude = 8.218857;
location57.address = "Adsbølvej 48, Strellev, 6870 Ølgod";
location57.phone = 75250275;
location57.price = 80;

var location58 = {};
location58.name = "Alslev Lystfiskersø";
location58.latitude = 55.576295;
location58.longitude = 8.448036;
location58.address = "Forumvej 90, Alslev, 6800 Varde";
location58.phone = 75269359;
location58.price = 50;

var location59 = {};
location59.name = "Bakkely Fiskesø";
location59.latitude = 55.934395;
location59.longitude = 9.141161;
location59.address = "Vejlevej 100, 7330 Brande";
location59.phone = 97180711;
location59.price = 75;

var location60 = {};
location60.name = "Ballerum Lystfiskeri";
location60.latitude = 57.041757;
location60.longitude = 8.766425;
location60.address = "Tangrimme 14, 7700 Thisted";
location60.phone = 97985335;
location60.price = 80;

var location61 = {};
location61.name = "Bjerrely Put & Take";
location61.latitude = 56.081939;
location61.longitude = 8.843479;
location61.address = "Bjerrevej 55 Tanderupkjær, 7400 Herning";
location61.phone = 23715103;
location61.price = 75;

var location62 = {};
location62.name = "Blåhøj Fiskesøer";
location62.latitude = 55.87442;
location62.longitude = 8.99379;
location62.address = "Stakrogevej 16, 7330 Brande";
location62.phone = 75345302;
location62.price = 75;

var location63 = {};
location63.name = "Bækhuse Put & Take";
location63.latitude = 55.710274;
location63.longitude = 8.381646;
location63.address = "Bækhusevej 55, 6855 Outrup";
location63.phone = 75251585;
location63.price = 60;

var location64 = {};
location64.name = "Bækmarksbro Put and Take";
location64.latitude = 56.404725;
location64.longitude = 8.305128;
location64.address = "Søhusvej 28, Møborg, 7660 Bækmarksbro";
location64.phone = 40102902;
location64.price = 70;

var location65 = {};
location65.name = "Drostrup Lystfiskersø";
location65.latitude = 55.521671;
location65.longitude = 9.139488;
location65.address = "Drostrupgårdvej 12, Bække, 6600 Vejen";
location65.phone = 75362694;
location65.price = 60;

var location66 = {};
location66.name = "Ejsing Put & Take";
location66.latitude = 56.512669;
location66.longitude = 8.748668;
location66.address = "Råstvej 3, Råst, 7830 Vinderup";
location66.phone = 97446900;
location66.price = 60;

var location67 = {};
location67.name = "Ejstrup Søerne";
location67.latitude = 56.02344;
location67.longitude = 8.643944;
location67.address = "Fasterlundvej 11,Ejstrup, 6900 Skjern";
location67.phone = 20845916;
location67.price = 75;

var location68 = {};
location68.name = "Engholm Lystfiskersø";
location68.latitude = 56.24614;
location68.longitude = 9.452899;
location68.address = "Engholmsvej 10a, 8620 Kjellerup";
location68.phone = 20323555;
location68.price = 100;

var location69 = {};
location69.name = "Fahlbæk Put & Take";
location69.latitude = 55.945523;
location69.longitude = 8.40188;
location69.address = "Langkærvej 4,Stauning, 6900 Skjern";
location69.phone = 97369161;
location69.price = 75;

var location70 = {};
location70.name = "Filskov Put & Take";
location70.latitude = 55.808384;
location70.longitude = 8.546247;
location70.address = "Bredsten landevej 7, 7200 Grindsted";
location70.phone = 20860779;
location70.price = 80;

var location71 = {};
location71.name = "Foersum Teglværkssøer";
location71.latitude = 55.870688;
location71.longitude = 8.516293;
location71.address = "Teglgårdsvej 7, 6880 Tarm";
location71.phone = 23456639;
location71.price = 70;

//Can't locate it
// var location99 = {};
// location99.name = "Fur Put & Take";
// location99.latitude = 55.808384;
// location99.longitude = 8.546247;
// location99.address = "Kønsborgvej 5, Kønsborg, 7884 Fur";
// location99.phone = 97593350;

var location72 = {};
location72.name = "Fårbæk Put & Take";
location72.latitude = 56.364323;
location72.longitude = 9.05443;
location72.address = "Fårbækvej 20, 7540 Haderup";
location72.phone = 97456167;
location72.price = 80;

var location73 = {};
location73.name = "Grindsted Fiskesø";
location73.latitude = 55.752888;
location73.longitude = 8.954887;
location73.address = "Hedemarken 18, 7200 Grindsted";
location73.phone = 75324433;
location73.price = 60;

var location74 = {};
location74.name = "Grærup Fiskesø";
location74.latitude = 55.640593;
location74.longitude = 8.18122;
location74.address = "Grærup Havvej,Grærup, 6840 Oksbøl";
location74.phone = 75277070;
location74.price = 80;

var location75 = {};
location75.name = "Grønbæk Put & Take";
location75.latitude = 56.283725;
location75.longitude = 9.642863;
location75.address = "Gl. Kongevej, Grønbæk, 8643 Ans";
location75.phone = 86870533;
location75.price = 75;

//Can't locate it
// var location104 = {};
// location104.name = "Hebo Sø - Put & Take";
// location104.latitude = 55.783958;
// location104.longitude = 8.546247;
// location104.address = "Hebovej 86, Sr.Hebo, 6851 Janderup";
// location104.phone = 75250275;

var location76 = {};
location76.name = "Herning Fiskepark";
location76.latitude = 56.136882;
location76.longitude = 8.91783;
location76.address = "Langvadbjergvej 23, 7400 Herning";
location76.phone = 97161600;
location76.price = 70;

var location77 = {};
location77.name = "Ho fiskesø";
location77.latitude = 55.561724;
location77.longitude = 8.218846;
location77.address = "Almosetoften 12, 6857 Blåvand";
location77.phone = 75279665;
location77.price = 80;

var location78 = {};
location78.name = "Højkilde Lystfiskerpark";
location78.latitude = 55.974038;
location78.longitude = 8.898904;
location78.address = "Hovedgaden 48, Skarrild, 6933 Kibæk";
location78.phone = 97196483;
location78.price = 75;

var location79 = {};
location79.name = "Højmark Lystfiskersøer";
location79.latitude = 56.049789;
location79.longitude = 8.405206;
location79.address = "Adelvej 10, Højmark, 6940 Lem";
location79.phone = 97343132;
location79.price = 60;

var location80 = {};
location80.name = "Højlund put & take";
location80.latitude = 56.098926;
location80.longitude = 8.724883;
location80.address = "Engholmvej 1, 6920 Videbæk";
location80.phone = 97175425;
location80.price = 50;

var location81 = {};
location81.name = "Høvring Sø";
location81.latitude = 56.125486;
location81.longitude = 8.320363;
location81.address = "Oksfeldvej 14, 6950 Ringkøbing";
location81.phone = 97330046;
location81.price = 60;

var location82 = {};
location82.name = "Klegod Ørredsø";
location82.latitude = 56.083022;
location82.longitude = 8.120463;
location82.address = "Holmsland Klitvej 100, 6950 Ringkøbing";
location82.phone = 97339025;
location82.price = 80;

var location83 = {};
location83.name = "Kloevergaardens Put & Take";
location83.latitude = 55.759336;
location83.longitude = 8.303325;
location83.address = "Kollevej 50, Kolle 6830 Nørre Nebel";
location83.phone = 20200026;
location83.price = 75;

var location84 = {};
location84.name = "Krogager Mergelgrav";
location84.latitude = 55.693975;
location84.longitude = 8.843415;
location84.address = "Refshøjvej 4, 7200 Grindsted";
location84.phone = 75339145;
location84.price = 60;

var location85 = {};
location85.name = "Kærshovedgaard Put & Take";
location85.latitude = 56.113213;
location85.longitude = 9.281859;
location85.address = "Teglgårdsvej, Kærshoved, 7441 Bording";
location85.phone = 21782454;
location85.price = 85;

var location86 = {};
location86.name = "Lilleflod Ørredfiskeri";
location86.latitude = 55.80807;
location86.longitude = 8.221164;
location86.address = "Vesterhavsvej 180, 6830 Nørre Nebel";
location86.phone = 75289940;
location86.price = 70;

var location87 = {};
location87.name = "Loch Nees Put and Take";
location87.latitude = 56.386471;
location87.longitude = 8.194878;
location87.address = "Sandbækvej 9, Nees, 7570";
location87.phone = 25248033;
location87.price = 100;

var location88 = {};
location88.name = "Lundbro Put & Take";
location88.latitude = 56.564094;
location88.longitude = 8.989627;
location88.address = "Herningvej 10, 7800 Skive";
location88.phone = 60240942;
location88.price = 70;

var location89 = {};
location89.name = "Lystfiskergaarden";
location89.latitude = 55.551954;
location89.longitude = 8.621092;
location89.address = "Søvej 1, Roust, 6818 Årre";
location89.phone = 75192071;
location89.price = 70;

var location90 = {};
location90.name = "Mejlbygård Lystfiskeri";
location90.latitude = 56.103653;
location90.longitude = 8.268735;
location90.address = "Ndr. Ringvej 10, 6950 Ringkøbing";
location90.phone = 97320251;
location90.price = 50;

//Can't find location
// var location120 = {};
// location120.name = "Midtthy Fiskepark";
// location120.latitude = 55.783958;
// location120.longitude = 8.546247;
// location120.address = "Damsgårdsvej 3, 7752 Snedsted";
// location120.phone = 75250275;

var location91 = {};
location91.name = "Morsø Fiskepark";
location91.latitude = 56.781487;
location91.longitude = 8.822515;
location91.address = "Frueled 78, 7900 Nykøbing Mors";
location91.phone = 97721029;
location91.price = 60;

var location92 = {};
location92.name = "Moselund Fiskesø";
location92.latitude = 56.11033;
location92.longitude = 8.534982;
location92.address = "Kratvej 4, 6971 Spjald";
location92.phone = 97382111;
location92.price = 50;

var location93 = {};
location93.name = "Munkbro Fiskesø";
location93.latitude = 56.32182;
location93.longitude = 8.64094;
location93.address = "Munkbrovej 15 - Nr. Felding, 7500 Holstebro";
location93.phone = 97424347;
location93.price = 90; 

var location94 = {};
location94.name = "Nebel Put & Take";
location94.latitude = 55.549891;
location94.longitude = 8.543308;
location94.address = "Vestervadvej 17, Vester Nebel 6715 Esbjerg N";
location94.phone = 51229076;
location94.price = 70;

var location95 = {};
location95.name = "Puglund Put & Take";
location95.latitude = 55.649795;
location95.longitude = 8.79874;
location95.address = "Puglundvej 12, 7200 grindsted";
location95.phone = 20736139;
location95.price = 80;

var location96 = {};
location96.name = "Rindsbæk Fiskepark";
location96.latitude = 56.399607;
location96.longitude = 9.47191;
location96.address = "Rindsbækvej 30,Sdr. Rind 8800 Viborg";
location96.phone = 86639170;
location96.price = 60;

var location97 = {};
location97.name = "Salling Put & Take";
location97.latitude = 56.57432;
location97.longitude = 8.834188;
location97.address = "Lægårdvej 6, Håsum 7860 Spøttrup";
location97.phone = 97566159;
location97.price = 75;

var location98 = {};
location98.name = "Silstrup Put & Take";
location98.latitude = 55.981758;
location98.longitude = 8.919525;
location98.address = "Skjernvej 19, Skarrild, 6933 Kibæk";
location98.phone = 40541518;
location98.price = 100;

var location99 = {};
location99.name = "Skjoldborg Lystfiskersø";
location99.latitude = 56.922976;
location99.longitude = 8.617616;
location99.address = "Oddesundvej 142, 7700 Thisted";
location99.phone = 97931579;
location99.price = 70;

var location100 = {};
location100.name = "Snedsted Fiskepark";
location100.latitude = 56.91411;
location100.longitude = 8.542857;
location100.address = "Mosevej 40, Todbøl, 7752 Snedsted";
location100.phone = 97934895;
location100.price = 70;

var location101 = {};
location101.name = "Stakroge Fiskesø";
location101.latitude = 55.893544;
location101.longitude = 8.860989;
location101.address = "Engebækvej 47, 7270 Stakroge";
location101.phone = 75347173;
location101.price = 60;

var location102 = {};
location102.name = "Stauning Fiskesø";
location102.latitude = 55.956264;
location102.longitude = 8.398726;
location102.address = "Hølletvej 1, Stauning, 6900 Skjern";
location102.phone = 97369178;
location102.price = 60;

var location103 = {};
location103.name = "Storkesøen Ribe";
location103.latitude = 55.317595;
location103.longitude = 8.759429;
location103.address = "Haulundvej 164, 6760 Ribe";
location103.phone = 75410411;
location103.price = 85;

var location104 = {};
location104.name = "Svanholm Lystfiskersø";
location104.latitude = 55.922235;
location104.longitude = 8.777062;
location104.address = "Bjergevej, 7280 Sdr. Felding";
location104.phone = 97198671;
location104.price = 60;

var location105 = {};
location105.name = "Sønderskov Put & Take";
location105.latitude = 55.936534;
location105.longitude = 8.632293;
location105.address = "Sønderskovvej 21, Borris, 6900 Skjern";
location105.phone = 97366271;
location105.price = 40;

var location106 = {};
location106.name = "Tjæreborg Fiskepark";
location106.latitude = 55.46747;
location106.longitude = 8.5797;
location106.address = "Hulvej 31, 6731 Tjæreborg";
location106.phone = 75176121;
location106.price = 75;

var location107 = {};
location107.name = "Torp Lystfiskersø";
location107.latitude = 56.35605;
location107.longitude = 9.103675;
location107.address = "Åhusevej 57, 7470 Karup J";
location107.phone = 97102409;
location107.price = 70;

var location108 = {};
location108.name = "Tusågård Put & Take";
location108.latitude = 56.277018;
location108.longitude = 9.185772;
location108.address = "Uhrevej 80 7470 Karup";
location108.phone = 97101321;
location108.price = 70;

var location109 = {};
location109.name = "Vibholm Ørredsø";
location109.latitude = 56.249001;
location109.longitude = 8.275838;
location109.address = "Skorkærvej 16, Madum, 6990 Ulfborg";
location109.phone = 97491456;
location109.price = 60;

var location110 = {};
location110.name = "Vrøgum Fiskesø";
location110.latitude = 55.65488;
location110.longitude = 8.310556;
location110.address = "Hedelundvej 15, Vrøgum 6840 Oksbøl";
location110.phone = 75271662;
location110.price = 50;

var location101 = {};
location111.name = "Ørbæk Ørredsø";
location111.latitude = 55.860092;
location111.longitude = 8.78108;
location111.address = "Gl. Borrisvej 11, 6880 Tarm";
location111.phone = 75321829;
location111.price = 85;

var location112 = {};
location112.name = "Østergård Put & Take";
location112.latitude = 55.692766;
location112.longitude = 8.848157;
location112.address = "Refshøjvej 5, 7200 Grindsted";
location112.phone = 75339501;
location112.price = 60;

var areaThree = {};
areaThree.name = "Vestjylland";
areaThree.locations = [];
areaThree.locations.push(location57);
areaThree.locations.push(location58);
areaThree.locations.push(location59);
areaThree.locations.push(location60);
areaThree.locations.push(location61);
areaThree.locations.push(location62);
areaThree.locations.push(location63);
areaThree.locations.push(location64);
areaThree.locations.push(location65);
areaThree.locations.push(location66);
areaThree.locations.push(location67);
areaThree.locations.push(location68);
areaThree.locations.push(location69);
areaThree.locations.push(location70);
areaThree.locations.push(location71);
areaThree.locations.push(location72);
areaThree.locations.push(location73);
areaThree.locations.push(location74);
areaThree.locations.push(location75);
areaThree.locations.push(location76);
areaThree.locations.push(location77);
areaThree.locations.push(location78);
areaThree.locations.push(location79);
areaThree.locations.push(location80);
areaThree.locations.push(location81);
areaThree.locations.push(location82);
areaThree.locations.push(location83);
areaThree.locations.push(location84);
areaThree.locations.push(location85);
areaThree.locations.push(location86);
areaThree.locations.push(location87);
areaThree.locations.push(location88);
areaThree.locations.push(location89);
areaThree.locations.push(location90);
areaThree.locations.push(location91);
areaThree.locations.push(location92);
areaThree.locations.push(location93);
areaThree.locations.push(location94);
areaThree.locations.push(location95);
areaThree.locations.push(location96);
areaThree.locations.push(location97);
areaThree.locations.push(location98);
areaThree.locations.push(location99);
areaThree.locations.push(location100);
areaThree.locations.push(location101);
areaThree.locations.push(location102);
areaThree.locations.push(location103);
areaThree.locations.push(location104);
areaThree.locations.push(location105);
areaThree.locations.push(location106);
areaThree.locations.push(location107);
areaThree.locations.push(location108);
areaThree.locations.push(location109);
areaThree.locations.push(location110);
areaThree.locations.push(location111);
areaThree.locations.push(location112);


var location113 = {};
location113.name = "Brynshøj Sø";
location113.latitude = 55.907077;
location113.longitude = 11.596627;
location113.address = "Højbygårdsvej 2, 4573 Højby Sj.";
location113.phone = 59302775;
location113.price = 60;

var location114 = {};
location114.name = "Farum drive put and take";
location114.latitude = 55.827902;
location114.longitude = 12.302027;
location114.address = "Nymøllevej Lynge";
location114.phone = 44953667;
location114.price = 120;

var location115 = {};
location115.name = "Fredensborg Ørredfiskeri";
location115.latitude = 55.98626;
location115.longitude = 12.421138;
location115.address = "Davidsvænge 7, 3480 Fredensborg";
location115.phone = 48484876;
location115.price = 120;

var location116 = {};
location116.name = "Hoby put & take";
location116.latitude = 54.734384;
location116.longitude = 11.266501;
location116.address = "Hobyvej 43 Hoby, 4983 Dannemare";
location116.phone = 54944223;
location116.price = 100;

var location117 = {};
location117.name = "Holmehave Fiskesø";
location117.latitude = 55.569707;
location117.longitude = 11.49303;
location117.address = "Tangagervej 4, 4293 Dianalund";
location117.phone = 39640044;
location117.price = 120;

var location118 = {};
location118.name = "Hove put and take";
location118.latitude = 55.712087;
location118.longitude = 12.242589;
location118.address = "Kalkgravsvej 22, 4000 Roskilde";
location118.phone = 40203475;
location118.price = 110;

var location119 = {};
location119.name = "Iglekær Sø";
location119.latitude = 54.779838;
location119.longitude = 11.298172;
location119.address = "Torebyvej 7 4891 Toreby, Lolland";
location119.phone = 22415382;
location119.price = 100;

var location120 = {};
location120.name = "Korsgaards Sportsfiskeri";
location120.latitude = 54.718436;
location120.longitude = 11.667824;
location120.address = "Tåstrupvej 5,Store Musse, 4880 Nysted";
location120.phone = 54864097;
location120.price = 80;

var location121 = {};
location121.name = "Lyngmose Put & Take";
location121.latitude = 54.897157;
location121.longitude = 11.31918;
location121.address = "Kapellanvej 20, 4943 Torrig";
location121.phone = 21427410;
location121.price = 120;

var location122 = {};
location122.name = "Lyns Put & Take";
location122.latitude = 54.697758;
location122.longitude = 11.948941;
location122.address = "Marielyst Strandvej 14, 4873 Væggerløse";
location122.phone = 54132366;
location122.price = 70;

var location123 = {};
location123.name = "Løgtvedgård Put & Take";
location123.latitude = 55.672127;
location123.longitude = 11.279612;
location123.address = "Kalundborgvej 78 Løgtved, 4470 Svebølle";
location123.phone = 59293740;
location123.price = 100;

var location124 = {};
location124.name = "Myrup-fishing I/S";
location124.latitude = 55.179603;
location124.longitude = 11.825366;
location124.address = "Skovmøllevej 26, Myrup, 4700 Næstved";
location124.phone = 40867601;
location124.price = 145;

var location125 = {};
location125.name = "Nivå Fiskepark";
location125.latitude = 55.940428;
location125.longitude = 12.516239;
location125.address = "Sølyst Allé 14, 2990 Nivå";
location125.phone = 00000000;
location125.price = 130;

var location126 = {};
location126.name = "Poppelsøens ørredvand";
location126.latitude = 55.731955;
location126.longitude = 12.326338;
location126.address = "Baltorpvej 208-212, 2750 Ballerup";
location126.phone = 40530689;
location126.price = 120;

var location127 = {};
location127.name = "Roskilde Fiskeland";
location127.latitude = 55.613686;
location127.longitude = 12.076914;
location127.address = "Kamstrupvej 150, 4000 Roskilde";
location127.phone = 46363525;
location127.price = 120;

var location128 = {};
location128.name = "Sildestrup Put & Take";
location128.latitude = 54.711867;
location128.longitude = 11.978209;
location128.address = "Sildestrup Øvej 14A, 4872 Idestrup";
location128.phone = 54148374;
location128.price = 70;

var location129 = {};
location129.name = "Solbjerggård Ørredfiskeri";
location129.latitude = 55.897983;
location129.longitude = 12.118092;
location129.address = "Strølillevej 7,Strølille 3320 Skævinge";
location129.phone = 48288515;
location129.price = 00;

// Can't find location
// var location130 = {};
// location130.name = "Sorø Lystfiskepark";
// location130.latitude = 55.907077;
// location130.longitude = 11.596627;
// location130.address = "Storfangersøen, Stenbjærgvej 12, 4280 Sorø";
// location130.telephone = 57821816;
// location130.price = 60;

var location130 = {};
location130.name = "St.Rosenbusk Put & Take";
location130.latitude = 55.840506;
location130.longitude = 12.241173;
location130.address = "Uggeløse Bygade 146 3540 Lynge";
location130.phone = 20324455;
location130.price = 120;

var location131 = {};
location131.name = "Stubysøen";
location131.latitude = 55.048777;
location131.longitude = 11.854849;
location131.address = "Stubyvej, Stuby 4760 Vordingborg";
location131.phone = 53776239;
location131.price = 50;

var location132 = {};
location132.name = "Svebølle Ørredfiskeri";
location132.latitude = 55.66696;
location132.longitude = 11.303086;
location132.address = "Frederiksholm 4470 Svebølle";
location132.phone = 23324865;
location132.price = 100;

var location133 = {};
location133.name = "Søllerød Fiskepark";
location133.latitude = 55.821019;
location133.longitude = 12.513578;
location133.address = "Attemosevej, 2840 Holte";
location133.phone = 20324455;
location133.price = 120;

var location134 = {};
location134.name = "Vanløse Fiskesø";
location134.latitude = 55.552585;
location134.longitude = 11.678402;
location134.address = "Vanløsevej 20, 4370 St. Merløse";
location134.phone = 57801657;
location134.price = 80;

var location135 = {};
location135.name = "Vesterled Put & Take";
location135.latitude = 55.123533;
location135.longitude = 11.943984;
location135.address = "Lundbyvej 20,Bårse, 4720 Præstø";
location135.phone = 55990034;
location135.price = 100;

var location136 = {};
location136.name = "Ørsted Fisk & golf";
location136.latitude = 55.523602;
location136.longitude = 12.050328;
location136.address = "Åbakkevej 13,Ørsted, 4130 Viby Sj.";
location136.phone = 46195519;
location136.price = 135;

var areaFour = {};
areaFour.name = "Sjælland";
areaFour.locations = [];
areaFour.locations.push(location113);
areaFour.locations.push(location114);
areaFour.locations.push(location115);
areaFour.locations.push(location116);
areaFour.locations.push(location117);
areaFour.locations.push(location118);
areaFour.locations.push(location119);
areaFour.locations.push(location120);
areaFour.locations.push(location121);
areaFour.locations.push(location122);
areaFour.locations.push(location123);
areaFour.locations.push(location124);
areaFour.locations.push(location125);
areaFour.locations.push(location126);
areaFour.locations.push(location127);
areaFour.locations.push(location128);
areaFour.locations.push(location129);
areaFour.locations.push(location130);
areaFour.locations.push(location131);
areaFour.locations.push(location132);
areaFour.locations.push(location133);
areaFour.locations.push(location134);
areaFour.locations.push(location135);
areaFour.locations.push(location136);

var location137 = {};
location137.name = "Anholm Fiskesø";
location137.latitude = 55.306971;
location137.longitude = 9.001236;
location137.address = "Folevej 16 Fole, 6510 Gram";
location137.phone = 74823433;
location137.price = 70;

var location138 = {};
location138.name = "Arrild Fiskesø";
location138.latitude = 55.15384;
location138.longitude = 8.949823;
location138.address = "Arrild Ferieby 505, 6520 Toftlund";
location138.phone = 74834000;
location138.price = 85;

var location139 = {};
location139.name = "Bakkegårdens Put & Take";
location139.latitude = 55.080357;
location139.longitude = 9.368913;
location139.address = "Bodumvej 3, 6230 Rødekro";
location139.phone = 74716022;
location139.price = 50;

var location140 = {};
location140.name = "Bevtoft Lystfiskersø";
location140.latitude = 55.191902;
location140.longitude = 9.229331;
location140.address = "Neder Jerstalvej 23, 6541 Bevtoft";
location140.phone = 74514221;
location140.price = 40;

var location141 = {};
location141.name = "Egenmølle Fiskesø";
location141.latitude = 54.976271;
location141.longitude = 9.886301;
location141.address = "Nordborgvej 120, 6430 Nordborg";
location141.phone = 74458092;
location141.price = 65;

var location142 = {};
location142.name = "AEngholm lystfiskersø";
location142.latitude = 56.246056;
location142.longitude = 9.452899;
location142.address = "Engholmsvej 10A, Mausing, 8620 Kjellerup";
location142.phone = 20323555;
location142.price = 100;

var location143 = {};
location143.name = "Fanø Fiskesø";
location143.latitude = 55.434626;
location143.longitude = 8.39216;
location143.address = "Storetoft 30, 6720 Fanø";
location143.phone = 29162115;
location143.price = 100;

var location144 = {};
location144.name = "Favstrup Sø";
location144.latitude = 55.335528;
location144.longitude = 9.519482;
location144.address = "Favstrupvej 70 Favstrup 6070 Christiansfeld";
location144.phone = 74561869;
location144.price = 60;

var location145 = {};
location145.name = "Frueskov Lystfiskersø";
location145.latitude = 54.876977;
location145.longitude = 9.473219;
location145.address = "Frueskovvej 2, Kelstrupskov, 6340 Kruså";
location145.phone = 74608375;
location145.price = 65;

var location146 = {};
location146.name = "Hvilested Lystfiskersøer";
location146.latitude = 55.50663;
location146.longitude = 9.363785;
location146.address = "Esbjergvej 338, 6000 Kolding";
location146.phone = 23317662;
location146.price = 70;

var location147 = {};
location147.name = "Lovtrup Put & Take";
location147.latitude = 54.956316;
location147.longitude = 9.267783;
location147.address = "Lovtrup Vestermark 15, 6360 Tinglev";
location147.phone = 9.267783;
location147.price = 100;

var location148 = {};
location148.name = "Mjøls Lystfiskeri";
location148.latitude = 55.067839;
location148.longitude = 9.298532;
location148.address = "Arnhøjvej 2, 6230 Rødekro";
location148.phone = 40348601;
location148.price = 65;

var location149 = {};
location149.name = "Renbæk Lystfiskersø";
location149.latitude = 55.180399;
location149.longitude = 8.903131;
location149.address = "Rømøvej 50, 6780 Skærbæk";
location149.phone = 21469065;
location149.price = 60;

var location150 = {};
location150.name = "Rødekro Lystfiskeri";
location150.latitude = 55.091324;
location150.longitude = 9.301686;
location150.address = "Østermarkvej 7, 6230 Rødekro";
location150.phone = 40335503;
location150.price = 70;

var location151 = {};
location151.name = "Rømø fiskesø";
location151.latitude = 55.173862;
location151.longitude = 8.554637;
location151.address = "Vestervej 46, 6792 Rømø";
location151.phone = 24253945;
location151.price = 100;

var location152 = {};
location152.name = "Sivbæk Fiskesø";
location152.latitude = 55.740835;
location152.longitude = 9.27525;
location152.address = "Grønhøjgårdvej 1, 7321 Gadbjerg";
location152.phone = 75883059;
location152.price = 95;

var location153 = {};
location153.name = "Stenvad Put & Take";
location153.latitude = 55.514941;
location153.longitude = 9.377131;
location153.address = "Stenvad 3, 6000 Kolding";
location153.phone = 51783017;
location153.price = 100;

var location154 = {};
location154.name = "Uge Lystfiskeri";
location154.latitude = 54.961774;
location154.longitude = 9.293232;
location154.address = "Aabenraavej 95, Uge, 6360 Tinglev";
location154.phone = 74644498;
location154.price = 65;


var areaFive = {};
areaFive.name = "Sønderjylland";
areaFive.locations = [];
areaFive.locations.push(location137);
areaFive.locations.push(location138);
areaFive.locations.push(location139);
areaFive.locations.push(location140);
areaFive.locations.push(location141);
areaFive.locations.push(location142);
areaFive.locations.push(location143);
areaFive.locations.push(location144);
areaFive.locations.push(location145);
areaFive.locations.push(location146);
areaFive.locations.push(location147);
areaFive.locations.push(location148);
areaFive.locations.push(location149);
areaFive.locations.push(location150);
areaFive.locations.push(location151);
areaFive.locations.push(location152);
areaFive.locations.push(location153);
areaFive.locations.push(location154);

var location155 = {};
location155.name = "Børge´s Put & Take";
location155.latitude = 55.434249;
location155.longitude = 10.058885;
location155.address = "Rydskovvej 22, Rydskov, 5560 Årup";
location155.phone = 64881630;
location155.price = 90;

var location156 = {};
location156.name = "Agernæs Saltvandssøer";
location156.latitude = 55.192613;
location156.longitude = 9.989233;
location156.address = "Helnæsvej 15, 5631 Ebberup";
location156.phone = 64771124;
location156.price = 75;

var location157 = {};
location157.name = "Mosegårdens Put & Take";
location157.latitude = 55.493856;
location157.longitude = 10.151625;
location157.address = "Mosegårdsvej 2, 5471 Søndersø";
location157.phone = 74644498;
location157.price = 0;

var location158 = {};
location158.name = "Ibjergvejens Fiskevand";
location158.latitude = 55.322906;
location158.longitude = 10.524495;
location158.address = "Ibjergvej 5-7, Tarup, 5792 Årslev";
location158.phone = 65972436;
location158.price = 75;

var location159 = {};
location159.name = "Langelands Lystfiskersø";
location159.latitude = 54.802181;
location159.longitude = 10.747461;
location159.address = "Slåvænget 9, Tryggelev, 5932 Humble";
location159.phone = 62562535;
location159.price = 100;

var location160 = {};
location160.name = "Aalsbogaard Lystfiskersøer";
location160.latitude = 55.425702;
location160.longitude = 10.013845;
location160.address = "Store Landevej 125, 5560 Aarup";
location160.phone = 64881552;
location160.price = 90;

var location161 = {};
location161.name = "Fyns Fiskevand";
location161.latitude = 55.331903;
location161.longitude = 10.566745;
location161.address = "Nyhavevej 6 Kappendrup, 5550 Langeskov";
location161.phone = 65972428;
location161.price = 90;

var location162 = {};
location162.name = "Højrupgård Put & Take";
location162.latitude = 55.190114;
location162.longitude = 10.3494;
location162.address = "Højrupvej 40, 5750 Ringe";
location162.phone = 25615464;
location162.price = 100;

var location163 = {};
location163.name = "Midtfyns Put and Take";
location163.latitude = 55.234664;
location163.longitude = 10.365665;
location163.address = "Sallingelunde 6, 5750 Ringe";
location163.phone = 41439402;
location163.price = 100;

var location164 = {};
location164.name = "Blue Rock Put and Take";
location164.latitude = 55.053067;
location164.longitude = 10.474842;
location164.address = "Ravnegårdsvej 16, 5762 V. Skerninge";
location164.phone = 29918191;
location164.price = 80;

var location165 = {};
location165.name = "Spodsbjerg Lystfiskersø";
location165.latitude = 54.942835;
location165.longitude = 10.830417;
location165.address = "Løkkeby Strandvej 8, 5953 Tranekær";
location165.phone = 62501541;
location165.price = 90;

var areaSix = {};
areaSix.name = "Fyn";
areaSix.locations = [];
areaSix.locations.push(location155);
areaSix.locations.push(location156);
areaSix.locations.push(location157);
areaSix.locations.push(location158);
areaSix.locations.push(location159);
areaSix.locations.push(location160);
areaSix.locations.push(location161);
areaSix.locations.push(location162);
areaSix.locations.push(location163);
areaSix.locations.push(location164);
areaSix.locations.push(location165);

var areaArray = [];

areaArray.push(areaOne);
areaArray.push(areaTwo);
areaArray.push(areaThree);
areaArray.push(areaFour);
areaArray.push(areaFive);
areaArray.push(areaSix);

for (var i = 0; i < areaArray.length; i++) {
	var tempArea = new Area();
	tempArea.name = areaArray[i].name;
	tempArea.locations = areaArray[i].locations;
	tempArea.save();
};

Area.findOne ({'name': 'Nordjylland'}, function(err, area){

	for (var i = 0; i < area.length; i++) {
		var tempLoc = new Location();
		tempLoc.latitude = area[i].latitude;
		tempLoc.longitude = area[i].longitude;
		tempLoc.name = area[i].name;
		area.locations.push(tempLoc);
	};

	area.save();
	// console.log(area.locations);

});

// Area.findOne ({'name': 'Østjylland'}, function(err, area){
// 
// 	for (var i = 0; i < area.length; i++) {
// 		var tempLoc = new Location();
// 		tempLoc.latitude = area[i].latitude;
// 		tempLoc.longitude = area[i].longitude;
// 		tempLoc.name = area[i].name;
// 		area.locations.push(tempLoc);
// 	};
// 
// 	area.save();
// 	// console.log(area.locations);
// 
// });



server.get("/", getIndex);
server.get("/areas", getAreas);

server.post("/area/new", newArea);
server.post("/area/location/new", newLocation);

var port = process.env.PORT || 5000;
server.listen(port, function() {
  return console.log("%s listening at %s", server.name, server.url);
});