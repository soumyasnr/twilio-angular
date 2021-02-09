import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import axios from 'axios';
import * as Video from 'twilio-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'twilio-angular';
  	dname ="";
  	droom ="";
  	jwt = '';

  	constructor(){

  	}
	async handleSubmit() {
	  try {
	  	
	  	

	    const result = await axios({
			  method: 'post',
			  url: 'https://mustard-herring-4612.twil.io/create-token',
			  data: {
					    identity: this.dname
			  }
			});
			 

	    console.log("create-token response: ");
	    console.log(result);
	    this.jwt = result.data;
	    this.video();

	  } catch (error) {
	    console.error(error);
	  }
	}

	video() {
		Video
		.connect(this.jwt, { video: true, audio:true, name: "test" })
		.then(room => {
			//Attach local video
			Video.createLocalVideoTrack().then(track => {
				console.log(track);
				// $("#localmedia").append(" <b>Appended text</b>.");
				// const local = document.getElementById("localmedia");
				// local.appendChild(track.attach);

				var z = document.createElement('div'); // is a node
				z.append(track.attach());

				document.body.appendChild(z);

			});
			console.log("successfully joined room");
			console.log(room);
			//Attach video from all participants

			room.participants.forEach(participant => {
				console.log(participant.tracks);
				participant.tracks.forEach(publication => {
					if(publication.isSubscribed) {  
						console.log("publication");
						console.log(publication);
						var track = publication.track;

						// var remote = document.createElement('div'); // is a node
						// remote.append(track.attach());

						// document.body.appendChild(remote);

					}
				});
			});
		});
	}

	sampleclick(){
		console.log("hi");
	}

}
