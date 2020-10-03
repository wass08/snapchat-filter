const canvasWidth = 800;
const canvasHeight = 600;
let videoInput;
let ctracker;

// MAPPING BASED ON https://www.auduno.com/clmtrackr/examples/media/facemodel_numbering_new.png
const mappingPositions = {
  centerHead: 33,
  leftEye: 27,
  rightEye: 32,
  nose: 62,
  mouth: 57
};

const itemsAssets = {
  hat : [null, 
  'https://www.wawasensei.dev/tutos/snapchat/assets/hat-mexican.svg', 
  'https://www.wawasensei.dev/tutos/snapchat/assets/hat-pirate.svg', 
  'https://www.wawasensei.dev/tutos/snapchat/assets/hat-santa.svg', 
  'https://www.wawasensei.dev/tutos/snapchat/assets/hat-viking.svg', 
  'https://www.wawasensei.dev/tutos/snapchat/assets/hat-wizard.svg'],
  
  glasses : [null, 
  'https://www.wawasensei.dev/tutos/snapchat/assets/glasses-hearts.svg',
  'https://www.wawasensei.dev/tutos/snapchat/assets/glasses-clown.svg',
  'https://www.wawasensei.dev/tutos/snapchat/assets/glasses-hipster.svg',
  'https://www.wawasensei.dev/tutos/snapchat/assets/glasses-3d.svg'],
  
  mouth : [null,
  'https://www.wawasensei.dev/tutos/snapchat/assets/mouth-covid.svg',
  'https://www.wawasensei.dev/tutos/snapchat/assets/mouth-lips.svg']
}

const hatOffset = 182;

let items = {
  hat: null,
  glasses: null,
  mouth: null,
}
let idxs = {
  hat: 0,
  glasses: 0,
  mouth: 0,
}



function loadItemForType(type, item) {
  if (item == null) {
    items[type] = null;
    return ;
  }
  items[type] = loadImage(item);
}

    function nextItemForType(type) {
      idxs[type]++;
      if (idxs[type] == itemsAssets[type].length) {
        idxs[type] = 0;
      }
      loadItemForType(type, itemsAssets[type][idxs[type]]);
    }

    function prevItemForType(type) {
      idxs[type]--;
      if (idxs[type] < 0) {
        idxs[type] = itemsAssets[type].length - 1;
      }
      loadItemForType(type, itemsAssets[type][idxs[type]]);
    }

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  videoInput = createCapture(VIDEO);
  videoInput.size(canvasWidth, canvasHeight);
  videoInput.hide();

  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput.elt);

}

function draw()
{
  image(videoInput, 0, 0, canvasWidth, canvasHeight); // render video from webcam
  var positions = ctracker.getCurrentPosition();
  if (!positions) {
    return ;
  }

  // Draw points
  stroke(255);
  positions.forEach(function (p) {
    point(p[0], p[1]);
  })

    if (items.hat != null) {
      image(items.hat, positions[mappingPositions.centerHead][0] - items.hat.width / 2, positions[mappingPositions.centerHead][1] - hatOffset, items.hat.width, items.hat.height);
    }
    if (items.glasses != null) {
      image(items.glasses, positions[mappingPositions.centerHead][0] - items.glasses.width / 2, positions[mappingPositions.centerHead][1] - items.glasses.height / 2, items.glasses.width, items.glasses.height);
    }
    if (items.mouth != null) {
      image(items.mouth, positions[mappingPositions.mouth][0] - items.mouth.width / 2, positions[mappingPositions.mouth][1] - items.mouth.height / 2, items.mouth.width, items.mouth.height);
    }

}