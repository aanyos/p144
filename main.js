
var canvasSizeX = 600;
var canvasSizeY = 500;
var canvasPosX = screen.width/2 - canvasSizeX/2;
var canvasPosY = screen.height/2 - canvasSizeY/2;

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

songStatus = "";

function preload()
{
  song1 = loadSound("HP1.mp3"); // left wrist
  song2 = loadSound("PP2.mp3"); // right wrist
}

function setup() {
  canvas = createCanvas(canvasSizeX, canvasSizeY);
  canvas.position(canvasPosX,canvasPosY);
  video = createCapture(VIDEO);
  video.size(canvasSizeX,canvasSizeY);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded () {
  console.log('PoseNet Is Initialized');
}

function draw() {
  image(video, 0, 0, 600, 500);
  
  fill("#FF0000");
	stroke("#FF0000");

  songStatus1 = song1.isPlaying();
  songStatus2 = song2.isPlaying();

  console.log(songStatus);

  if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
    song2.stop();

    if(songStatus1 == false){
      song1.play();
      document.getElementById("mysong").innerHTML = "Song Name: Harry Potter Theme Song";
    }
	}

  if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);
    song1.stop();

    if(songStatus2 == false){
      song2.play();
      document.getElementById("mysong").innerHTML = "Song Name: Peter Pan Theme Song";
    }
	}

}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    
  }
}