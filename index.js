/**********************************************************************

	App for YouTube
	nodejs index.js https://www.youtube.com/watch?v=1PT04r32iNI

**********************************************************************/
const fs = require('fs');
const youtubedl = require('youtube-dl');

(( argv ) => {
	if ( argv[0] && argv[0] != '' ) {
	
		var options = [];
			youtubedl.getInfo(argv[0], options, function(e, info) {
			  if (e) {
					console.log("Erro na captura: ", e);
					process.exit(1);
				}

			  let textContent = 'title: [ ' + info.title + ' ]' + "\r\n" + 'description:' + info.description

			  fs.writeFile( 'downloads/' + info.title + '.txt' , textContent , 'utf8' , () => {
			  	console.log( 'Info file generated' )
			  })

			  let video = youtubedl(argv[0],
				  // Optional arguments passed to youtube-dl.
				  ['--format=18'],
				  // Additional options can be given for calling `child_process.execFile()`.
				  { cwd: __dirname })
		 	
				// Will be called when the download starts.
				video.on('info', function( info ) {
				  console.log( 'Download started' )
				})

				video.pipe(fs.createWriteStream( 'downloads/'+info.title+'.mp4' ))

			})
	}
})( process.argv.slice(2) )
