var restify = require("restify");
var http = require("http");

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/my_database'); // use for development
mongoose.connect(process.env.MONGOHQ_URL); // use for deployment

var Schema = mongoose.Schema;

var Locations = new Schema({
    latitude     : Number
  , longitude    : Number
  , name      	 : String
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


// var location0 = {};
// location0.name = "Bindslev Fiskepark";
// location0.latitude = 57.537931;
// location0.longitude = 10.226104;
// 
// var location1 = {};
// location1.name = "St. Restrup Fiskesø";
// location1.latitude = 57.003249;
// location1.longitude = 9.777703;
// 
// var location2 = {};
// location2.name = "Hirtshals Put & Take";
// location2.latitude = 57.572397;
// location2.longitude = 9.945116;
// 
// var location3 = {};
// location3.name = "Løkken Fiskepark";
// location3.latitude = 57.336343;
// location3.longitude = 9.70803;
// 
// var location4 = {};
// location4.name = "Blokhus Fiskepark";
// location4.latitude = 57.210325;
// location4.longitude = 9.666188;
// 
// var location5 = {};
// location5.name = "Dvergetved Søpark";
// location5.latitude = 57.480726;
// location5.longitude = 10.373712;
// 
// var location6 = {};
// location6.name = "Brøndumgaard Fiskesø";
// location6.latitude = 56.96455;
// location6.longitude = 9.356146;
// 
// var location7 = {};
// location7.name = "Gunderup Fiskesø";
// location7.latitude = 56.824064;
// location7.longitude = 9.237936;
// 
// var location8 = {};
// location8.name = "Gølstrup Fiskepark";
// location8.latitude = 57.42208;
// location8.longitude = 9.811049;
// 
// var location9 = {};
// location9.name = "Poulstrup Ørredfiskeri";
// location9.latitude = 57.345225;
// location9.longitude = 10.019124;
// 
// var location10 = {};
// location10.name = "Lagunen Fiskepark";
// location10.latitude = 57.040636;
// location10.longitude = 10.35779;
// 
// var location11 = {};
// location11.name = "Jægerumgård Fiskepark";
// location11.latitude = 57.109868;
// location11.longitude = 9.564478;
// 
// var location12 = {};
// location12.name = "Revsbæk Put & Take";
// location12.latitude = 56.695623;
// location12.longitude = 10.112851;
// 
// var location13 = {};
// location13.name = "Volstrup Fiskepark";
// location13.latitude = 56.681694;
// location13.longitude = 9.708652;
// 
// var location14 = {};
// location14.name = "Himmerland Fiskepark";
// location14.latitude = 56.955576;
// location14.longitude = 9.430282;
// 
// var location15 = {};
// location15.name = "Gøttrup Fiskepark";
// location15.latitude = 57.052472;
// location15.longitude = 9.210427;
// 
// var location16 = {};
// location16.name = "Møllehallen Put & Take";
// location16.latitude = 56.97186;
// location16.longitude = 9.945116;
// 
// var location17 = {};
// location17.name = "Teglværkssøen";
// location17.latitude = 56.734943;
// location17.longitude = 10.15229;
// 
// // var location18 = {};
// // location17.name = "Poutrup Fiskesø";
// // location18.latitude = 11111111111;
// // location18.longitude = 111111111111;
// 
// var location18 = {};
// location18.name = "Tversted Put & Take";
// location18.latitude = 57.581049;
// location18.longitude = 10.216126;
// 
// var location19 = {};
// location19.name = "Hvorupgård Fiskesø";
// location19.latitude = 57.112898;
// location19.longitude = 9.923315;
// 
// // var location21 = {};
// // location21.name = "Søttrup Put & Take";
// // location21.latitude = 111111111;
// // location21.longitude = 111111111;
// 
// var location20 = {};
// location20.name = "Ny Thorup Fiskepark";
// location20.latitude = 57.303439;
// location20.longitude = 9.93134;
// 
// var location21 = {};
// location21.name = "Vennebjerg Put & Take";
// location21.latitude = 57.468774;
// location21.longitude = 9.8489;
// 
// var location22 = {};
// location22.name = "Gaaser Fiskesø";
// location22.latitude = 57.009311;
// location22.longitude = 10.196729;
// 
// var location23 = {};
// location23.name = "Nørholm Fiskepark";
// location23.latitude = 57.024313;
// location23.longitude = 9.734402;
// 
// var location24 = {};
// location24.name = "Serritslev Fiskepark";
// location24.latitude = 57.297782;
// location24.longitude = 9.959106;
// 
// var location25 = {};
// location25.name = "Medestedet Put & Take";
// location25.latitude = 56.759651;
// location25.longitude = 9.958591;
// 
// var location26 = {};
// location26.name = "Kinnerup Put & Take";
// location26.latitude = 57.130277;
// location26.longitude = 10.076716;
// 
// var location27 = {};
// location27.name = "Fiskepark Nord";
// location27.latitude = 57.473008;
// location27.longitude = 10.500011;
// 
// var location28 = {};
// location28.name = "Tollundgaard Put and Take";
// location28.latitude = 56.153558;
// location28.longitude = 9.423974;
// 
// var areaOne = {};
// areaOne.name = "Nordjylland";
// areaOne.locations = [];
// areaOne.locations.push(location1);
// areaOne.locations.push(location2);
// areaOne.locations.push(location3);
// areaOne.locations.push(location4);
// areaOne.locations.push(location5);
// areaOne.locations.push(location6);
// areaOne.locations.push(location7);
// areaOne.locations.push(location8);
// areaOne.locations.push(location9);
// areaOne.locations.push(location10);
// areaOne.locations.push(location11);
// areaOne.locations.push(location12);
// areaOne.locations.push(location13);
// areaOne.locations.push(location14);
// areaOne.locations.push(location15);
// areaOne.locations.push(location16);
// areaOne.locations.push(location17);
// areaOne.locations.push(location18);
// areaOne.locations.push(location19);
// areaOne.locations.push(location20);
// areaOne.locations.push(location21);
// areaOne.locations.push(location22);
// areaOne.locations.push(location23);
// areaOne.locations.push(location24);
// areaOne.locations.push(location25);
// areaOne.locations.push(location26);
// areaOne.locations.push(location27);
// areaOne.locations.push(location28);

var location29 = {};
location29.name = "Adsbøl Lake";
location29.latitude = 55.783717;
location29.longitude = 8.546333;

var location30 = {};
location30.name = "Alslev Lystfiskersø";
location30.latitude = 55.57627;
location30.longitude = 8.447971;

var location31 = {};
location31.name = "Bakkely Fiskesø";
location31.latitude = 55.934407;
location31.longitude = 9.141161;

var location32 = {};
location32.name = "Bjerrely Put & Take";
location32.latitude = 56.081831;
location32.longitude = 8.843388;

var location33 = {};
location33.name = "Blåhøj Fiskesøer";
location33.latitude = 55.874504;
location33.longitude = 8.993876;

var location34 = {};
location34.name = "Bækhuse Put & Take";
location34.latitude = 55.71031;
location34.longitude = 8.381667;

var location35 = {};
location35.name = "Bækmarksbro Put and Take";
location35.latitude = 56.404665;
location35.longitude = 8.305171;

var location36 = {};
location36.name = "Drostrup Lystfiskersø";
location36.latitude = 55.521695;
location36.longitude = 9.139423;

var location37 = {};
location37.name = "Ejsing Put & Take";
location37.latitude = 56.512805;
location37.longitude = 8.748765;

var location38 = {};
location38.name = "Ejstrup Søerne";
location38.latitude = 56.023464;
location38.longitude = 8.643923;

var location39 = {};
location39.name = "Engholm Lystfiskersø";
location39.latitude = 56.24608;
location39.longitude = 9.452963;

var location40 = {};
location40.name = "Fahlbæk Put & Take";
location40.latitude = 55.945523;
location40.longitude = 8.402181;

var location41 = {};
location41.name = "Filskov Put & Take";
location41.latitude = 55.807588;
location41.longitude = 9.061425;

var location42 = {};
location42.name = "Foersum Teglværkssøer";
location42.latitude = 55.870712;
location42.longitude = 8.516314;

var location43 = {};
location43.name = "Fårbæk Put & Take";
location43.latitude = 56.364335;
location43.longitude = 9.054558;

var location44 = {};
location44.name = "Grindsted Fiskesø";
location44.latitude = 55.7529;
location44.longitude = 8.954909;

var location45 = {};
location45.name = "Grærup Fiskesø";
location45.latitude = 55.642433;
location45.longitude = 8.181896;

var location46 = {};
location46.name = "Grønbæk Put & Take";
location46.latitude = 56.284249;
location46.longitude = 9.643164;

var location47 = {};
location47.name = "Herning Fiskepark";
location47.latitude = 56.136954;
location47.longitude = 8.917956;

var location48 = {};
location48.name = "Ho fiskesø";
location48.latitude = 55.561748;
location48.longitude = 8.218907;

var location49 = {};
location49.name = "Højkilde Lystfiskerpark";
location49.latitude = 55.974014;
location49.longitude = 8.898729;

var location50 = {};
location50.name = "Højmark Lystfiskersøer";
location50.latitude = 56.049765;
location50.longitude = 8.405418;

var location51 = {};
location51.name = "Højlund put & take";
location51.latitude = 56.098926;
location51.longitude = 8.724944;

var location52 = {};
location52.name = "Høvring Sø";
location52.latitude = 56.125438;
location52.longitude = 8.320338;

var location53 = {};
location53.name = "Klegod Ørredsø";
location53.latitude = 56.083196;
location53.longitude = 8.120395;

var location54 = {};
location54.name = "Kloevergaardens Put & Take";
location54.latitude = 55.764756;
location54.longitude = 8.302356;

var location55 = {};
location55.name = "Krogager Mergelgrav";
location55.latitude = 55.693975;
location55.longitude = 8.843369;

var location56 = {};
location56.name = "Kærshovedgaard Put & Take";
location56.latitude = 56.114026;
location56.longitude = 9.281632;

var location57 = {};
location57.name = "Lilleflod Ørredfiskeri";
location57.latitude = 55.808143;
location57.longitude = 8.221354;

var location58 = {};
location58.name = "Loch Nees Put and Take";
location58.latitude = 56.38646;
location58.longitude = 8.194961;

var location59 = {};
location59.name = "Lundbro Put & Take";
location59.latitude = 56.564106;
location59.longitude = 8.989667;

var location60 = {};
location60.name = "Lystfiskergaarden";
location60.latitude = 55.552609;
location60.longitude = 8.622183;

var location61 = {};
location61.name = "Mejlbygård Lystfiskeri";
location61.latitude = 56.103545;
location61.longitude = 8.268625;

var location62 = {};
location62.name = "Morsø Fiskepark";
location62.latitude = 56.781405;
location62.longitude = 8.822598;

var location63 = {};
location63.name = "Moselund Fiskesø";
location63.latitude = 56.110234;
location63.longitude = 8.535065;

var location64 = {};
location64.name = "Munkbro Fiskesø";
location64.latitude = 56.321868;
location64.longitude = 8.641001;

var location65 = {};
location65.name = "Nebel Put & Take";
location65.latitude = 55.549781;
location65.longitude = 8.543283;

var location66 = {};
location66.name = "Puglund Put & Take";
location66.latitude = 55.64982;
location66.longitude = 8.798651;

var location67 = {};
location67.name = "Rindsbæk Fiskepark";
location67.latitude = 56.399536;
location67.longitude = 9.471928;

var location68 = {};
location68.name = "Salling Put & Take";
location68.latitude = 56.574331;
location68.longitude = 8.834271;

var location69 = {};
location69.name = "Silstrup Put & Take";
location69.latitude = 55.981734;
location69.longitude = 8.91935;

var location70 = {};
location70.name = "Skjoldborg Lystfiskersø";
location70.latitude = 56.922906;
location70.longitude = 8.617655;

var location71 = {};
location71.name = "Snedsted Fiskepark";
location71.latitude = 56.913665;
location71.longitude = 8.542704;

var location72 = {};
location72.name = "Stakroge Fiskesø";
location72.latitude = 55.893483;
location72.longitude = 8.860857;

var location73 = {};
location73.name = "Stauning Fiskesø";
location73.latitude = 55.956312;
location73.longitude = 8.39868;

var location74 = {};
location74.name = "Storkesøen Ribe";
location74.latitude = 55.317534;
location74.longitude = 8.759555;

var location75 = {};
location75.name = "Svanholm Lystfiskersø";
location75.latitude = 55.92176;
location75.longitude = 8.779167;

var location76 = {};
location76.name = "Sønderskov Put & Take";
location76.latitude = 55.936498;
location76.longitude = 8.632418;

var location77 = {};
location77.name = "Tjæreborg Fiskepark";
location77.latitude = 55.467579;
location77.longitude = 8.579697;

var location78 = {};
location78.name = "Torp Lystfiskersø";
location78.latitude = 56.356145;
location78.longitude = 9.103736;

var location79 = {};
location79.name = "Tusågård Put & Take";
location79.latitude = 56.276947;
location79.longitude = 9.185704;

var location80 = {};
location80.name = "Vibholm Ørredsø";
location80.latitude = 56.249013;
location80.longitude = 8.275835;

var location81 = {};
location81.name = "Vrøgum Fiskesø";
location81.latitude = 55.655038;
location81.longitude = 8.310532;

var location82 = {};
location82.name = "Ørbæk Ørredsø";
location82.latitude = 55.860261;
location82.longitude = 8.781141;

var location83 = {};
location83.name = "Østergård Put & Take";
location83.latitude = 55.69279;
location83.longitude = 8.848111;

var areaTwo = {};
areaTwo.name = "Østjylland";
areaTwo.locations = [];
areaTwo.locations.push(location29);
areaTwo.locations.push(location30);
areaTwo.locations.push(location31);
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
areaTwo.locations.push(location44);
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
areaTwo.locations.push(location57);
areaTwo.locations.push(location58);
areaTwo.locations.push(location59);
areaTwo.locations.push(location60);
areaTwo.locations.push(location61);
areaTwo.locations.push(location62);
areaTwo.locations.push(location62);
areaTwo.locations.push(location64);
areaTwo.locations.push(location65);
areaTwo.locations.push(location66);
areaTwo.locations.push(location67);
areaTwo.locations.push(location68);
areaTwo.locations.push(location69);
areaTwo.locations.push(location70);
areaTwo.locations.push(location71);
areaTwo.locations.push(location72);
areaTwo.locations.push(location73);
areaTwo.locations.push(location74);
areaTwo.locations.push(location75);
areaTwo.locations.push(location76);
areaTwo.locations.push(location77);
areaTwo.locations.push(location78);
areaTwo.locations.push(location79);
areaTwo.locations.push(location80);
areaTwo.locations.push(location81);
areaTwo.locations.push(location82);
areaTwo.locations.push(location83);

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

// areaArray.push(areaOne);
areaArray.push(areaTwo);

for (var i = 0; i < areaArray.length; i++) {
	var tempArea = new Area();
	tempArea.name = areaArray[i].name;
	tempArea.locations = areaArray[i].locations;
	tempArea.save();
};

// Area.findOne ({'name': 'Nordjylland'}, function(err, area){
// 
// 	for (var i = 0; i < Nordjylland.length; i++) {
// 		var tempLoc = new Location();
// 		tempLoc.latitude = Nordjylland[i].latitude;
// 		tempLoc.longitude = Nordjylland[i].longitude;
// 		tempLoc.name = Nordjylland[i].name;
// 		area.locations.push(tempLoc);
// 	};
// 
// 	area.save();
// 	console.log(area.locations);
// 
// });

Area.findOne ({'name': 'Østjylland'}, function(err, area){

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



server.get("/", getIndex);
server.get("/areas", getAreas);

server.post("/area/new", newArea);
server.post("/area/location/new", newLocation);

var port = process.env.PORT || 5000;
server.listen(port, function() {
  return console.log("%s listening at %s", server.name, server.url);
});