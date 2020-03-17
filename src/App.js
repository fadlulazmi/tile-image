import React, {useState} from 'react';
import './App.css';

function App() {
  const [img, setImg] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img6, setImg6] = useState(null);
  // const [img7, setImg7] = useState(null);
  // const [img8, setImg8] = useState(null);
  // const [img9, setImg9] = useState(null)
  const [imageBig, setimageBig] = useState(null)
  // const [arrImg, setarrImg] = useState([])
  const [name, setname] = useState("")
  var upload;

  const onChange = (e) => {
    setImg(false)
    const file = e.target.files[0]
    const name = file.name
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        setname(name)
        createTiles(image)
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const getBlob = canvas => {
    return new Promise(resolve => {
      // canvas.toBlob(blob => {
      //   const url = URL.createObjectURL(blob)
      //   resolve(url)
      // })
      resolve(canvas.toDataURL())
    })
  }

  const createTiles = async (image) => {
    var imagePieces = [];
    const eachWidth = image.naturalWidth / 3;
    const eachHeight = image.naturalHeight / 2;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
		for (var i = 0; i < 6; i++) {
      canvas.width = eachWidth;
      canvas.height = eachHeight;
      const x = (-eachWidth * i) % (eachWidth * 3)
      const y = (eachHeight * i) <= eachHeight*2 ? 0 : -eachHeight
      context.drawImage(image, x, y, eachWidth*3, eachHeight*2);
      const blob = await getBlob(canvas)
      imagePieces.push(blob);
		}

    setImg(true)
    // setarrImg(imagePieces)
    setImg1(imagePieces[0])
    setImg2(imagePieces[1]);
    setImg3(imagePieces[2]);
    setImg4(imagePieces[3])
    setImg5(imagePieces[4]);
    setImg6(imagePieces[5]);
    // setImg7(imagePieces[6]);
    // setImg8(imagePieces[7]);
    // setImg9(imagePieces[8]);
    mergeAllFiles(image, imagePieces)
  }

  const createImage = (src) => {
    return new Promise(resolve => {
      const img = new Image();
			img.onload = () => {
        resolve(img)
			};
			img.src = src
    })
  }

  const mergeAllFiles = async (image, arr) => {
    const eachWidth = image.naturalWidth / 3;
    const eachHeight = image.naturalHeight / 2;
    var canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight
		for (var i = 0; i < 6; i++) {
    var context = canvas.getContext("2d");
			const x = (-eachWidth * i) % (eachWidth * 3);
			const y = eachHeight * i <= eachHeight * 2 ? 0 : -eachHeight;
      const img = await createImage(arr[i])
			context.drawImage(img, canvas.width, canvas.height);
		}
    setimageBig(canvas.toDataURL())
  }

  return (
		<div className="App">
			<div style={{ height: "80vh" }}>
				<input
					ref={ref => (upload = ref)}
					type="file"
					style={{ display: "none" }}
					onChange={e => onChange(e)}
				/>
				<button onClick={() => upload.click()}>browse</button>
				<br />
				{img && (
					<div>
						<img
							src={img1}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img2}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img3}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<br />
						<img
							src={img4}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img5}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img6}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						{/* <br />
						<img
							src={img7}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img8}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
						<img
							src={img9}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/> */}
						<br />
						<img
							src={imageBig}
							alt="imageTiles"
							height="250px"
							width="250px"
							style={{ objectFit: "contain", border: "1px dashed black" }}
						/>
					</div>
				)}
				<p>{name}</p>
			</div>
		</div>
	);
}

export default App;
