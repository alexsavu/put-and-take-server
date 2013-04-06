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
  , telephone    : Number
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

var location1 = {};
location1.name = "St. Restrup Fiskesø";
location1.latitude = 57.003249;
location1.longitude = 9.777703;

var location2 = {};
location2.name = "Hirtshals Put & Take";
location2.latitude = 57.572397;
location2.longitude = 9.945116;

var location3 = {};
location3.name = "Løkken Fiskepark";
location3.latitude = 57.336343;
location3.longitude = 9.70803;

var location4 = {};
location4.name = "Blokhus Fiskepark";
location4.latitude = 57.210325;
location4.longitude = 9.666188;

var location5 = {};
location5.name = "Dvergetved Søpark";
location5.latitude = 57.480726;
location5.longitude = 10.373712;

var location6 = {};
location6.name = "Brøndumgaard Fiskesø";
location6.latitude = 56.96455;
location6.longitude = 9.356146;

var location7 = {};
location7.name = "Gunderup Fiskesø";
location7.latitude = 56.824064;
location7.longitude = 9.237936;

var location8 = {};
location8.name = "Gølstrup Fiskepark";
location8.latitude = 57.42208;
location8.longitude = 9.811049;

var location9 = {};
location9.name = "Poulstrup Ørredfiskeri";
location9.latitude = 57.345225;
location9.longitude = 10.019124;

var location10 = {};
location10.name = "Lagunen Fiskepark";
location10.latitude = 57.040636;
location10.longitude = 10.35779;

var location11 = {};
location11.name = "Jægerumgård Fiskepark";
location11.latitude = 57.109868;
location11.longitude = 9.564478;

var location12 = {};
location12.name = "Revsbæk Put & Take";
location12.latitude = 56.695623;
location12.longitude = 10.112851;

var location13 = {};
location13.name = "Volstrup Fiskepark";
location13.latitude = 56.681694;
location13.longitude = 9.708652;

var location14 = {};
location14.name = "Himmerland Fiskepark";
location14.latitude = 56.955576;
location14.longitude = 9.430282;

var location15 = {};
location15.name = "Gøttrup Fiskepark";
location15.latitude = 57.052472;
location15.longitude = 9.210427;

var location16 = {};
location16.name = "Møllehallen Put & Take";
location16.latitude = 56.97186;
location16.longitude = 9.945116;

var location17 = {};
location17.name = "Teglværkssøen";
location17.latitude = 56.734943;
location17.longitude = 10.15229;

// var location18 = {};
// location17.name = "Poutrup Fiskesø";
// location18.latitude = 11111111111;
// location18.longitude = 111111111111;

var location18 = {};
location18.name = "Tversted Put & Take";
location18.latitude = 57.581049;
location18.longitude = 10.216126;

var location19 = {};
location19.name = "Hvorupgård Fiskesø";
location19.latitude = 57.112898;
location19.longitude = 9.923315;

// var location21 = {};
// location21.name = "Søttrup Put & Take";
// location21.latitude = 111111111;
// location21.longitude = 111111111;

var location20 = {};
location20.name = "Ny Thorup Fiskepark";
location20.latitude = 57.303439;
location20.longitude = 9.93134;

var location21 = {};
location21.name = "Vennebjerg Put & Take";
location21.latitude = 57.468774;
location21.longitude = 9.8489;

var location22 = {};
location22.name = "Gaaser Fiskesø";
location22.latitude = 57.009311;
location22.longitude = 10.196729;

var location23 = {};
location23.name = "Nørholm Fiskepark";
location23.latitude = 57.024313;
location23.longitude = 9.734402;

var location24 = {};
location24.name = "Serritslev Fiskepark";
location24.latitude = 57.297782;
location24.longitude = 9.959106;

var location25 = {};
location25.name = "Medestedet Put & Take";
location25.latitude = 56.759651;
location25.longitude = 9.958591;

var location26 = {};
location26.name = "Kinnerup Put & Take";
location26.latitude = 57.130277;
location26.longitude = 10.076716;

var location27 = {};
location27.name = "Fiskepark Nord";
location27.latitude = 57.473008;
location27.longitude = 10.500011;

var location28 = {};
location28.name = "Tollundgaard Put and Take";
location28.latitude = 56.153558;
location28.longitude = 9.423974;

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

// var location29 = {};
// location29.name = "Adsbøl Lake";
// location29.latitude = 55.783717;
// location29.longitude = 8.546333;
// 
// var location30 = {};
// location30.name = "Alslev Lystfiskersø";
// location30.latitude = 55.57627;
// location30.longitude = 8.447971;
// 
// var location31 = {};
// location31.name = "Bakkely Fiskesø";
// location31.latitude = 55.934407;
// location31.longitude = 9.141161;
// 
// var location32 = {};
// location32.name = "Bjerrely Put & Take";
// location32.latitude = 56.081831;
// location32.longitude = 8.843388;
// 
// var location33 = {};
// location33.name = "Blåhøj Fiskesøer";
// location33.latitude = 55.874504;
// location33.longitude = 8.993876;
// 
// var location34 = {};
// location34.name = "Bækhuse Put & Take";
// location34.latitude = 55.71031;
// location34.longitude = 8.381667;
// 
// var location35 = {};
// location35.name = "Bækmarksbro Put and Take";
// location35.latitude = 56.404665;
// location35.longitude = 8.305171;
// 
// var location36 = {};
// location36.name = "Drostrup Lystfiskersø";
// location36.latitude = 55.521695;
// location36.longitude = 9.139423;
// 
// var location37 = {};
// location37.name = "Ejsing Put & Take";
// location37.latitude = 56.512805;
// location37.longitude = 8.748765;
// 
// var location38 = {};
// location38.name = "Ejstrup Søerne";
// location38.latitude = 56.023464;
// location38.longitude = 8.643923;
// 
// var location39 = {};
// location39.name = "Engholm Lystfiskersø";
// location39.latitude = 56.24608;
// location39.longitude = 9.452963;
// 
// var location40 = {};
// location40.name = "Fahlbæk Put & Take";
// location40.latitude = 55.945523;
// location40.longitude = 8.402181;
// 
// var location41 = {};
// location41.name = "Filskov Put & Take";
// location41.latitude = 55.807588;
// location41.longitude = 9.061425;
// 
// var location42 = {};
// location42.name = "Foersum Teglværkssøer";
// location42.latitude = 55.870712;
// location42.longitude = 8.516314;
// 
// var location43 = {};
// location43.name = "Fårbæk Put & Take";
// location43.latitude = 56.364335;
// location43.longitude = 9.054558;
// 
// var location44 = {};
// location44.name = "Grindsted Fiskesø";
// location44.latitude = 55.7529;
// location44.longitude = 8.954909;
// 
// var location45 = {};
// location45.name = "Grærup Fiskesø";
// location45.latitude = 55.642433;
// location45.longitude = 8.181896;
// 
// var location46 = {};
// location46.name = "Grønbæk Put & Take";
// location46.latitude = 56.284249;
// location46.longitude = 9.643164;
// 
// var location47 = {};
// location47.name = "Herning Fiskepark";
// location47.latitude = 56.136954;
// location47.longitude = 8.917956;
// 
// var location48 = {};
// location48.name = "Ho fiskesø";
// location48.latitude = 55.561748;
// location48.longitude = 8.218907;
// 
// var location49 = {};
// location49.name = "Højkilde Lystfiskerpark";
// location49.latitude = 55.974014;
// location49.longitude = 8.898729;
// 
// var location50 = {};
// location50.name = "Højmark Lystfiskersøer";
// location50.latitude = 56.049765;
// location50.longitude = 8.405418;
// 
// var location51 = {};
// location51.name = "Højlund put & take";
// location51.latitude = 56.098926;
// location51.longitude = 8.724944;
// 
// var location52 = {};
// location52.name = "Høvring Sø";
// location52.latitude = 56.125438;
// location52.longitude = 8.320338;
// 
// var location53 = {};
// location53.name = "Klegod Ørredsø";
// location53.latitude = 56.083196;
// location53.longitude = 8.120395;
// 
// var location54 = {};
// location54.name = "Kloevergaardens Put & Take";
// location54.latitude = 55.764756;
// location54.longitude = 8.302356;
// 
// var location55 = {};
// location55.name = "Krogager Mergelgrav";
// location55.latitude = 55.693975;
// location55.longitude = 8.843369;
// 
// var location56 = {};
// location56.name = "Kærshovedgaard Put & Take";
// location56.latitude = 56.114026;
// location56.longitude = 9.281632;
// 
// var location57 = {};
// location57.name = "Lilleflod Ørredfiskeri";
// location57.latitude = 55.808143;
// location57.longitude = 8.221354;
// 
// var location58 = {};
// location58.name = "Loch Nees Put and Take";
// location58.latitude = 56.38646;
// location58.longitude = 8.194961;
// 
// var location59 = {};
// location59.name = "Lundbro Put & Take";
// location59.latitude = 56.564106;
// location59.longitude = 8.989667;
// 
// var location60 = {};
// location60.name = "Lystfiskergaarden";
// location60.latitude = 55.552609;
// location60.longitude = 8.622183;
// 
// var location61 = {};
// location61.name = "Mejlbygård Lystfiskeri";
// location61.latitude = 56.103545;
// location61.longitude = 8.268625;
// 
// var location62 = {};
// location62.name = "Morsø Fiskepark";
// location62.latitude = 56.781405;
// location62.longitude = 8.822598;
// 
// var location63 = {};
// location63.name = "Moselund Fiskesø";
// location63.latitude = 56.110234;
// location63.longitude = 8.535065;
// 
// var location64 = {};
// location64.name = "Munkbro Fiskesø";
// location64.latitude = 56.321868;
// location64.longitude = 8.641001;
// 
// var location65 = {};
// location65.name = "Nebel Put & Take";
// location65.latitude = 55.549781;
// location65.longitude = 8.543283;
// 
// var location66 = {};
// location66.name = "Puglund Put & Take";
// location66.latitude = 55.64982;
// location66.longitude = 8.798651;
// 
// var location67 = {};
// location67.name = "Rindsbæk Fiskepark";
// location67.latitude = 56.399536;
// location67.longitude = 9.471928;
// 
// var location68 = {};
// location68.name = "Salling Put & Take";
// location68.latitude = 56.574331;
// location68.longitude = 8.834271;
// 
// var location69 = {};
// location69.name = "Silstrup Put & Take";
// location69.latitude = 55.981734;
// location69.longitude = 8.91935;
// 
// var location70 = {};
// location70.name = "Skjoldborg Lystfiskersø";
// location70.latitude = 56.922906;
// location70.longitude = 8.617655;
// 
// var location71 = {};
// location71.name = "Snedsted Fiskepark";
// location71.latitude = 56.913665;
// location71.longitude = 8.542704;
// 
// var location72 = {};
// location72.name = "Stakroge Fiskesø";
// location72.latitude = 55.893483;
// location72.longitude = 8.860857;
// 
// var location73 = {};
// location73.name = "Stauning Fiskesø";
// location73.latitude = 55.956312;
// location73.longitude = 8.39868;
// 
// var location74 = {};
// location74.name = "Storkesøen Ribe";
// location74.latitude = 55.317534;
// location74.longitude = 8.759555;
// 
// var location75 = {};
// location75.name = "Svanholm Lystfiskersø";
// location75.latitude = 55.92176;
// location75.longitude = 8.779167;
// 
// var location76 = {};
// location76.name = "Sønderskov Put & Take";
// location76.latitude = 55.936498;
// location76.longitude = 8.632418;
// 
// var location77 = {};
// location77.name = "Tjæreborg Fiskepark";
// location77.latitude = 55.467579;
// location77.longitude = 8.579697;
// 
// var location78 = {};
// location78.name = "Torp Lystfiskersø";
// location78.latitude = 56.356145;
// location78.longitude = 9.103736;
// 
// var location79 = {};
// location79.name = "Tusågård Put & Take";
// location79.latitude = 56.276947;
// location79.longitude = 9.185704;
// 
// var location80 = {};
// location80.name = "Vibholm Ørredsø";
// location80.latitude = 56.249013;
// location80.longitude = 8.275835;
// 
// var location81 = {};
// location81.name = "Vrøgum Fiskesø";
// location81.latitude = 55.655038;
// location81.longitude = 8.310532;
// 
// var location82 = {};
// location82.name = "Ørbæk Ørredsø";
// location82.latitude = 55.860261;
// location82.longitude = 8.781141;
// 
// var location83 = {};
// location83.name = "Østergård Put & Take";
// location83.latitude = 55.69279;
// location83.longitude = 8.848111;
// 
// var areaTwo = {};
// areaTwo.name = "Østjylland";
// areaTwo.locations = [];
// areaTwo.locations.push(location29);
// areaTwo.locations.push(location30);
// areaTwo.locations.push(location31);
// areaTwo.locations.push(location32);
// areaTwo.locations.push(location33);
// areaTwo.locations.push(location34);
// areaTwo.locations.push(location35);
// areaTwo.locations.push(location36);
// areaTwo.locations.push(location37);
// areaTwo.locations.push(location38);
// areaTwo.locations.push(location39);
// areaTwo.locations.push(location40);
// areaTwo.locations.push(location41);
// areaTwo.locations.push(location42);
// areaTwo.locations.push(location43);
// areaTwo.locations.push(location44);
// areaTwo.locations.push(location45);
// areaTwo.locations.push(location46);
// areaTwo.locations.push(location47);
// areaTwo.locations.push(location48);
// areaTwo.locations.push(location49);
// areaTwo.locations.push(location50);
// areaTwo.locations.push(location51);
// areaTwo.locations.push(location52);
// areaTwo.locations.push(location53);
// areaTwo.locations.push(location54);
// areaTwo.locations.push(location55);
// areaTwo.locations.push(location56);
// areaTwo.locations.push(location57);
// areaTwo.locations.push(location58);
// areaTwo.locations.push(location59);
// areaTwo.locations.push(location60);
// areaTwo.locations.push(location61);
// areaTwo.locations.push(location62);
// areaTwo.locations.push(location62);
// areaTwo.locations.push(location64);
// areaTwo.locations.push(location65);
// areaTwo.locations.push(location66);
// areaTwo.locations.push(location67);
// areaTwo.locations.push(location68);
// areaTwo.locations.push(location69);
// areaTwo.locations.push(location70);
// areaTwo.locations.push(location71);
// areaTwo.locations.push(location72);
// areaTwo.locations.push(location73);
// areaTwo.locations.push(location74);
// areaTwo.locations.push(location75);
// areaTwo.locations.push(location76);
// areaTwo.locations.push(location77);
// areaTwo.locations.push(location78);
// areaTwo.locations.push(location79);
// areaTwo.locations.push(location80);
// areaTwo.locations.push(location81);
// areaTwo.locations.push(location82);
// areaTwo.locations.push(location83);

var location84 = {};
location84.name = "Adsbøl Sø";
location84.latitude = 55.783958;
location84.longitude = 8.218857;
location84.address = "Adsbølvej 48, Strellev, 6870 Ølgod";
location84.telephone = 75250275;

var location85 = {};
location85.name = "Alslev Lystfiskersø";
location85.latitude = 55.576295;
location85.longitude = 8.448036;
location85.address = "Forumvej 90, Alslev, 6800 Varde";
location85.telephone = 75269359;

var location86 = {};
location86.name = "Bakkely Fiskesø";
location86.latitude = 55.934395;
location86.longitude = 9.141161;
location86.address = "Vejlevej 100, 7330 Brande";
location86.telephone = 97180711;

var location87 = {};
location87.name = "Ballerum Lystfiskeri";
location87.latitude = 57.041757;
location87.longitude = 8.766425;
location87.address = "Tangrimme 14, 7700 Thisted";
location87.telephone = 97985335;

var location88 = {};
location88.name = "Bjerrely Put & Take";
location88.latitude = 56.081939;
location88.longitude = 8.843479;
location88.address = "Bjerrevej 55 Tanderupkjær, 7400 Herning";
location88.telephone = 23715103;

var location89 = {};
location89.name = "Blåhøj Fiskesøer";
location89.latitude = 55.87442;
location89.longitude = 8.99379;
location89.address = "Stakrogevej 16, 7330 Brande";
location89.telephone = 75345302;

var location90 = {};
location90.name = "Bækhuse Put & Take";
location90.latitude = 55.710274;
location90.longitude = 8.381646;
location90.address = "Bækhusevej 55, 6855 Outrup";
location90.telephone = 75251585;

var location91 = {};
location91.name = "Bækmarksbro Put and Take";
location91.latitude = 56.404725;
location91.longitude = 8.305128;
location91.address = "Søhusvej 28, Møborg, 7660 Bækmarksbro";
location91.telephone = 40102902;

var location92 = {};
location92.name = "Drostrup Lystfiskersø";
location92.latitude = 55.521671;
location92.longitude = 9.139488;
location92.address = "Drostrupgårdvej 12, Bække, 6600 Vejen";
location92.telephone = 75362694;

var location93 = {};
location93.name = "Ejsing Put & Take";
location93.latitude = 56.512669;
location93.longitude = 8.748668;
location93.address = "Råstvej 3, Råst, 7830 Vinderup";
location93.telephone = 97446900;

var location94 = {};
location94.name = "Ejstrup Søerne";
location94.latitude = 56.02344;
location94.longitude = 8.643944;
location94.address = "Fasterlundvej 11,Ejstrup, 6900 Skjern";
location94.telephone = 20845916;

var location95 = {};
location95.name = "Engholm Lystfiskersø";
location95.latitude = 56.24614;
location95.longitude = 9.452899;
location95.address = "Engholmsvej 10a, 8620 Kjellerup";
location95.telephone = 20323555;

var location96 = {};
location96.name = "Fahlbæk Put & Take";
location96.latitude = 55.945523;
location96.longitude = 8.40188;
location96.address = "Langkærvej 4,Stauning, 6900 Skjern";
location96.telephone = 97369161;

var location97 = {};
location97.name = "Filskov Put & Take";
location97.latitude = 55.808384;
location97.longitude = 8.546247;
location97.address = "Bredsten landevej 7, 7200 Grindsted";
location97.telephone = 20860779;

var location98 = {};
location98.name = "Foersum Teglværkssøer";
location98.latitude = 55.870688;
location98.longitude = 8.516293;
location98.address = "Teglgårdsvej 7, 6880 Tarm";
location98.telephone = 23456639;

//Can't locate it
// var location99 = {};
// location99.name = "Fur Put & Take";
// location99.latitude = 55.808384;
// location99.longitude = 8.546247;
// location99.address = "Kønsborgvej 5, Kønsborg, 7884 Fur";
// location99.telephone = 97593350;

var location100 = {};
location100.name = "Fårbæk Put & Take";
location100.latitude = 56.364323;
location100.longitude = 9.05443;
location100.address = "Fårbækvej 20, 7540 Haderup";
location100.telephone = 97456167;

var location101 = {};
location101.name = "Grindsted Fiskesø";
location101.latitude = 55.752888;
location101.longitude = 8.954887;
location101.address = "Hedemarken 18, 7200 Grindsted";
location101.telephone = 75324433;

var location102 = {};
location102.name = "Grærup Fiskesø";
location102.latitude = 55.640593;
location102.longitude = 8.18122;
location102.address = "Grærup Havvej,Grærup, 6840 Oksbøl";
location102.telephone = 75277070;

var location103 = {};
location103.name = "Grønbæk Put & Take";
location103.latitude = 56.283725;
location103.longitude = 9.642863;
location103.address = "Gl. Kongevej, Grønbæk, 8643 Ans";
location103.telephone = 86870533;

//Can't locate it
// var location104 = {};
// location104.name = "Hebo Sø - Put & Take";
// location104.latitude = 55.783958;
// location104.longitude = 8.546247;
// location104.address = "Hebovej 86, Sr.Hebo, 6851 Janderup";
// location104.telephone = 75250275;

var location105 = {};
location105.name = "Herning Fiskepark";
location105.latitude = 56.136882;
location105.longitude = 8.91783;
location105.address = "Langvadbjergvej 23, 7400 Herning";
location105.telephone = 97161600;

var location106 = {};
location106.name = "Ho fiskesø";
location106.latitude = 55.561724;
location106.longitude = 8.218846;
location106.address = "Almosetoften 12, 6857 Blåvand";
location106.telephone = 75279665;

var location107 = {};
location107.name = "Højkilde Lystfiskerpark";
location107.latitude = 55.974038;
location107.longitude = 8.898904;
location107.address = "Hovedgaden 48, Skarrild, 6933 Kibæk";
location107.telephone = 97196483;

var location108 = {};
location108.name = "Højmark Lystfiskersøer";
location108.latitude = 56.049789;
location108.longitude = 8.405206;
location108.address = "Adelvej 10, Højmark, 6940 Lem";
location108.telephone = 97343132;

var location109 = {};
location109.name = "Højlund put & take";
location109.latitude = 56.098926;
location109.longitude = 8.724883;
location109.address = "Engholmvej 1, 6920 Videbæk";
location109.telephone = 97175425;

var location110 = {};
location110.name = "Høvring Sø";
location110.latitude = 56.125486;
location110.longitude = 8.320363;
location110.address = "Oksfeldvej 14, 6950 Ringkøbing";
location110.telephone = 97330046;

var location111 = {};
location111.name = "Klegod Ørredsø";
location111.latitude = 56.083022;
location111.longitude = 8.120463;
location111.address = "Holmsland Klitvej 100, 6950 Ringkøbing";
location111.telephone = 97339025;

var location112 = {};
location112.name = "Kloevergaardens Put & Take";
location112.latitude = 55.759336;
location112.longitude = 8.303325;
location112.address = "Kollevej 50, Kolle 6830 Nørre Nebel";
location112.telephone = 20200026;

var location113 = {};
location113.name = "Krogager Mergelgrav";
location113.latitude = 55.693975;
location113.longitude = 8.843415;
location113.address = "Refshøjvej 4, 7200 Grindsted";
location113.telephone = 75339145;

var location114 = {};
location114.name = "Kærshovedgaard Put & Take";
location114.latitude = 56.113213;
location114.longitude = 9.281859;
location114.address = "Teglgårdsvej, Kærshoved, 7441 Bording";
location114.telephone = 21782454;

var location115 = {};
location115.name = "Lilleflod Ørredfiskeri";
location115.latitude = 55.80807;
location115.longitude = 8.221164;
location115.address = "Vesterhavsvej 180, 6830 Nørre Nebel";
location115.telephone = 75289940;

var location116 = {};
location116.name = "Loch Nees Put and Take";
location116.latitude = 56.386471;
location116.longitude = 8.194878;
location116.address = "Sandbækvej 9, Nees, 7570";
location116.telephone = 25248033;

var location117 = {};
location117.name = "Lundbro Put & Take";
location117.latitude = 56.564094;
location117.longitude = 8.989627;
location117.address = "Herningvej 10, 7800 Skive";
location117.telephone = 60240942;

var location118 = {};
location118.name = "Lystfiskergaarden";
location118.latitude = 55.551954;
location118.longitude = 8.621092;
location118.address = "Søvej 1, Roust, 6818 Årre";
location118.telephone = 75192071;

var location119 = {};
location119.name = "Mejlbygård Lystfiskeri";
location119.latitude = 56.103653;
location119.longitude = 8.268735;
location119.address = "Ndr. Ringvej 10, 6950 Ringkøbing";
location119.telephone = 97320251;

//Can't find location
// var location120 = {};
// location120.name = "Midtthy Fiskepark";
// location120.latitude = 55.783958;
// location120.longitude = 8.546247;
// location120.address = "Damsgårdsvej 3, 7752 Snedsted";
// location120.telephone = 75250275;

var location121 = {};
location121.name = "Morsø Fiskepark";
location121.latitude = 56.781487;
location121.longitude = 8.822515;
location121.address = "Frueled 78, 7900 Nykøbing Mors";
location121.telephone = 97721029;

var location122 = {};
location122.name = "Moselund Fiskesø";
location122.latitude = 56.11033;
location122.longitude = 8.534982;
location122.address = "Kratvej 4, 6971 Spjald";
location122.telephone = 97382111;

var location123 = {};
location123.name = "Munkbro Fiskesø";
location123.latitude = 56.32182;
location123.longitude = 8.64094;
location123.address = "Munkbrovej 15 - Nr. Felding, 7500 Holstebro";
location123.telephone = 97424347;

var location124 = {};
location124.name = "Nebel Put & Take";
location124.latitude = 55.549891;
location124.longitude = 8.543308;
location124.address = "Vestervadvej 17, Vester Nebel 6715 Esbjerg N";
location124.telephone = 51229076;

var location84 = {};
location83.name = "Adsbøl Sø";
location83.latitude = 55.783958;
location83.longitude = 8.546247;
location83.address = "Adsbølvej 48, Strellev, 6870 Ølgod";
location83.telephone = 75250275;

var areaThree = {};
areaThree.name = "Vestjylland";
areaThree.locations = [];

var areaFour = {};
areaFour.name = "Sønderjylland";
areaFour.locations = [];

var areaFive = {};
areaFive.name = "Sjælland";
areaFive.locations = [];

var areaSix = {};
areaSix.name = "Fyn";
areaSix.locations = [];

var areaSeven = {};
areaSeven.name = "Bornholm";
areaSeven.locations = [];

var areaArray = [];

areaArray.push(areaOne);
// areaArray.push(areaTwo);

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