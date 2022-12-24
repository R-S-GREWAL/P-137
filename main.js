video = "";
objects = [];
stature = "";
function preload()
{
    video = createVideo(VIDEO);
    video.hide();
}
function setup() 
{
    canvas = createCanvas(400,350);
    canvas.center();
    video = createCapture(VIDEO);
	video.size(900,325);
    video.hide();
}
function draw()
{
    image(video, 0,0,400,350);
    if(stature != "")
    {
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++){
        document.getElementById("stature").innerHTML = "Status : Objects Detected";
        document.getElementById("number").innerHTML = "Number of Objects detected are : "+ objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("stature").innerHTML = "Stature : Detecting Objects";
}
function stop()
{
    video.stop();
}
function modelLoaded()
{
    console.log("Model Loaded!");
    stature = true;
    video.loop();
    video.volume(1);
    video.speed(1);
}
function gotResult(error, results)
{
 if (error) {
    console.error(error);
 } else {
    console.log(results);
    objects = results;
 }
}