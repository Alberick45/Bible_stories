export const CHARACTER_CONFIG = {
  narrator: { voice: 'af_heart', speed: 0.95 },
  god: { voice: 'am_echo', speed: 0.82 },
  eve: { voice: 'af_bella', speed: 0.95 },
  serpent: { voice: 'am_michael', speed: 0.78 },
  cain: { voice: 'am_michael', speed: 0.92 },
  abel: { voice: 'am_onyx', speed: 0.92 },
  noah: { voice: 'am_michael', speed: 0.92 },
  nimrod: { voice: 'am_michael', speed: 0.92 },
  builder: { voice: 'am_michael', speed: 0.92 },
  worker: { voice: 'am_michael', speed: 0.92 },
  abram: { voice: 'am_michael', speed: 0.92 },
  abraham: { voice: 'am_michael', speed: 0.92 },
  isaac: { voice: 'am_onyx', speed: 0.94 },
  angel: { voice: 'af_bella', speed: 0.90 },
  jacob: { voice: 'am_michael', speed: 0.92 }
};

export function makeCacheKey(text, voice, modelVersion = 'kokoro-q4-v1') {
  const str = `${text}::${voice}::${modelVersion}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
}

const rawScenes = [
  // ==========================================
  // CREATION
  // ==========================================
  { chapterId: 'creation', type: 'narrative', text: 'In the beginning God created the heaven and the earth.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And the earth was without form, and void; and darkness was upon the face of the deep.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And God said, "Let there be light."', character: 'God' },
  { chapterId: 'creation', type: 'narrative', text: 'And God saw the light, that it was good: and God divided the light from the darkness.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And God said, "Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."', character: 'God' },
  { chapterId: 'creation', type: 'narrative', text: 'And God said, "Let the waters under the heaven be gathered together unto one place, and let the dry land appear:"', character: 'God' },
  { chapterId: 'creation', type: 'narrative', text: 'And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And God said, "Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven."', character: 'God' },
  { chapterId: 'creation', type: 'narrative', text: 'And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it...', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'Thus the heavens and the earth were finished, and all the host of them.', character: 'Narrator' },
  { chapterId: 'creation', type: 'narrative', text: 'And on the seventh day God ended his work which he had made; and he rested on the seventh day...', character: 'Narrator' },
  { chapterId: 'creation', type: 'interactive', action: 'find_animals', targetCount: 5, instruction: '<span class="goal-tag">🎯 GOAL</span> Walk across the Earth as Adam and find 5 creatures (<span id="named-count">0</span>/5). Tap or click a creature, or walk close to discover it.' },

  // ==========================================
  // EDEN
  // ==========================================
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'The tree of life also in the midst of the garden, and the tree of knowledge of good and evil.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'And out of the ground the LORD God formed every beast of the field, and every fowl of the air...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And brought them unto Adam to see what he would call them...', character: 'Narrator' },
  { chapterId: 'eden', type: 'interactive', action: 'name_animals', targetCount: 5, instruction: '<span class="goal-tag">🎯 GOAL</span> Walk through Eden and name 5 creatures (<span id="named-count">0</span>/5). Tap or click an animal, or walk close to record its name.' },
  { chapterId: 'eden', type: 'narrative', text: 'And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'But for Adam there was not found an help meet for him.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God caused a deep sleep to fall upon Adam, and he slept...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And he took one of his ribs, and closed up the flesh instead thereof...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.', character: 'Adam' },
  { chapterId: 'eden', type: 'narrative', text: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', character: 'Narrator' },
  { chapterId: 'eden', type: 'interactive', action: 'find_tree', target: 'tree', instruction: '<span class="goal-tag">🎯 GOAL</span> Find the Great Tree of Knowledge in the center of Eden with glowing fruits to witness the Fall.' },
  { chapterId: 'eden', type: 'narrative', text: 'Now the serpent was more subtil than any beast of the field which the LORD God had made.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'Yea, hath God said, Ye shall not eat of every tree of the garden?', character: 'Serpent' },
  { chapterId: 'eden', type: 'narrative', text: 'We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.', character: 'Eve' },
  { chapterId: 'eden', type: 'narrative', text: 'Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.', character: 'Serpent' },
  { chapterId: 'eden', type: 'narrative', text: 'And when the woman saw that the tree was good for food, and that it was pleasant to the eyes...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: '...she took of the fruit thereof, and did eat...', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'Eat of it, and thine eyes shall be opened.', character: 'Eve' },
  { chapterId: 'eden', type: 'narrative', text: '...and gave also unto her husband with her; and he did eat.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the eyes of them both were opened, and they knew that they were naked.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And they heard the voice of the LORD God walking in the garden in the cool of the day.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: '...and Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God called unto Adam, and said unto him, "Where art thou?"', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.', character: 'Adam' },
  { chapterId: 'eden', type: 'narrative', text: 'And he said, "Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat?"', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.', character: 'Adam' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God said unto the woman, "What is this that thou hast done?"', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'The serpent beguiled me, and I did eat.', character: 'Eve' },
  { chapterId: 'eden', type: 'narrative', text: 'And the LORD God said unto the serpent, "Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life..."', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'Unto the woman he said, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children..."', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'And unto Adam he said, "Because thou has hearkened unto the voice of thy wife, and has eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life..."', character: 'God' },
  { chapterId: 'eden', type: 'narrative', text: 'Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.', character: 'Narrator' },
  { chapterId: 'eden', type: 'narrative', text: 'So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.', character: 'Narrator' },

  // ==========================================
  // CAIN & ABEL
  // ==========================================
  { chapterId: 'cainabel', type: 'narrative', text: 'And Adam knew Eve his wife; and she conceived, and bare Cain...', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'I have gotten a man from the LORD.', character: 'Eve' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And she again bare his brother Abel.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Abel was a keeper of sheep, but Cain was a tiller of the ground.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Abel, he also brought of the firstlings of his flock and of the fat thereof.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'interactive', target: 'altar', instruction: 'Walk to the central Altar of Stones to present your offering.' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And the LORD had respect unto Abel and to his offering...', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'But unto Cain and to his offering he had not respect.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Cain was very wroth, and his countenance fell.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And the LORD said unto Cain, "Why art thou wroth? and why is thy countenance fallen?"', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: '"If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door..."', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Cain talked with Abel his brother:', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And the LORD said unto Cain, "Where is Abel thy brother?"', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: "I know not: Am I my brother's keeper?", character: 'Cain' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And he said, "What hast thou done? the voice of thy brother\'s blood crieth unto me from the ground."', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: '"And now art thou cursed from the earth, which hath opened her mouth to receive thy brother\'s blood from thy hand;"', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: '"When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be in the earth."', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: 'My punishment is greater than I can bear. Behold, thou hast driven me out this day from the face of the earth;', character: 'Cain' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And the LORD said unto him, "Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold."', character: 'God' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And the LORD set a mark upon Cain, lest any finding him should kill him.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And Adam knew his wife again; and she bare a son, and called his name Seth...', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'For God hath appointed me another seed instead of Abel, whom Cain slew.', character: 'Eve' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And it came to pass, when men began to multiply on the face of the earth...', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'The earth also was corrupt before God, and the earth was filled with violence.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'And it repented the LORD that he had made man on the earth, and it grieved him at his heart.', character: 'Narrator' },
  { chapterId: 'cainabel', type: 'narrative', text: 'But Noah found grace in the eyes of the LORD.', character: 'Narrator' },

  // ==========================================
  // NOAH
  // ==========================================
  { chapterId: 'noah', type: 'narrative', text: 'And God said unto Noah, "The end of all flesh is come before me; for the earth is filled with violence through them..."', character: 'God' },
  { chapterId: 'noah', type: 'narrative', text: '"Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."', character: 'God' },
  { chapterId: 'noah', type: 'narrative', text: 'And Noah did according unto all that the LORD commanded him.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'Thus did Noah; according to all that God commanded him, so did he.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the LORD said unto Noah, "Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."', character: 'God' },
  { chapterId: 'noah', type: 'interactive', target: 'animals', instruction: '<span class="goal-tag">🎯 GOAL</span> Guide Noah to the animal pairs to herd them into the Ark.' },
  { chapterId: 'noah', type: 'narrative', text: "And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.", character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: '...and the LORD shut him in.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: '...the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the rain was upon the earth forty days and forty nights.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the flood was forty days upon the earth; and the waters increased, and bare up the ark...', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And God remembered Noah, and every living thing, and all the cattle that was with him in the ark...', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the rain from heaven was restrained; And the waters returned from off the earth continually.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'Also he sent forth a dove from him, to see if the waters were abated from off the face of the ground;', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: "And Noah went forth, and his sons, and his wife, and his sons' wives with him...", character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.', character: 'Narrator' },
  { chapterId: 'noah', type: 'narrative', text: 'And God said, "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth."', character: 'God' },
  { chapterId: 'noah', type: 'narrative', text: '"And the waters shall no more become a flood to destroy all flesh."', character: 'God' },

  // ==========================================
  // BABEL
  // ==========================================
  { chapterId: 'babel', type: 'narrative', text: 'And the whole earth was of one language, and of one speech.', character: 'Narrator' },
  { chapterId: 'babel', type: 'narrative', text: 'And they said, "Go to, let us build us a city and a tower, whose top may reach unto heaven..."', character: 'Nimrod' },
  { chapterId: 'babel', type: 'narrative', text: 'And they had brick for stone, and slime had they for morter.', character: 'Narrator' },
  { chapterId: 'babel', type: 'narrative', text: 'And they said, "...and let us make us a name, lest we be scattered abroad upon the face of the whole earth."', character: 'Narrator' },
  { chapterId: 'babel', type: 'narrative', text: 'And the LORD came down to see the city and the tower, which the children of men builded.', character: 'Narrator' },
  { chapterId: 'babel', type: 'narrative', text: '"Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another\'s speech."', character: 'God' },
  { chapterId: 'babel', type: 'narrative', text: 'Δόξα τῷ Θεῷ! (Wait, what did you say?)', character: 'Worker' },
  { chapterId: 'babel', type: 'narrative', text: 'Quid agis? (I cannot understand you!)', character: 'Worker' },
  { chapterId: 'babel', type: 'narrative', text: 'Baga bo pi do! (What is this gibberish?!)', character: 'Worker' },
  { chapterId: 'babel', type: 'narrative', text: 'And there the LORD did confound the language of all the earth...', character: 'Narrator' },
  { chapterId: 'babel', type: 'narrative', text: 'So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.', character: 'Narrator' },
  { chapterId: 'babel', type: 'interactive', target: 'ruins', instruction: '<span class="goal-tag">🎯 GOAL</span> Walk among the builders of Shinar at the foundation of the Tower (<span id="babel-count">0</span>/3). Approach 3 builders to hear their confounded tongues.' },

  // ==========================================
  // THE CALL OF ABRAM & COVENANT OF STARS (GENESIS 12 & 15)
  // ==========================================
  { chapterId: 'abram', type: 'narrative', text: 'Now the LORD had said unto Abram, "Get thee out of thy country, and from thy kindred, and from thy father\'s house, unto a land that I will shew thee..."', character: 'God' },
  { chapterId: 'abram', type: 'narrative', text: '"And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing."', character: 'God' },
  { chapterId: 'abram', type: 'narrative', text: 'So Abram departed, as the LORD had spoken unto him; and Lot went with him.', character: 'Narrator' },
  { chapterId: 'abram', type: 'narrative', text: 'And Abram passed through the land unto the place of Sichem, unto the plain of Moreh. And the Canaanite was then in the land.', character: 'Narrator' },
  { chapterId: 'abram', type: 'narrative', text: 'And the LORD appeared unto Abram, and said, "Unto thy seed will I give this land:" and there builded he an altar unto the LORD.', character: 'Narrator' },
  { chapterId: 'abram', type: 'narrative', text: 'After these things the word of the LORD came unto Abram in a vision, saying, "Fear not, Abram: I am thy shield, and thy exceeding great reward."', character: 'God' },
  { chapterId: 'abram', type: 'narrative', text: 'And he brought him forth abroad, and said, "Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be."', character: 'God' },
  { chapterId: 'abram', type: 'narrative', text: 'And he believed in the LORD; and he counted it to him for righteousness.', character: 'Narrator' },
  { chapterId: 'abram', type: 'interactive', target: 'stars', instruction: '<span class="goal-tag">🎯 GOAL</span> Walk under the starry canopy of Canaan with Abram (<span id="abram-count">0</span>/3). Gaze upon the promises written in the stars.' },

  // ==========================================
  // THE SACRIFICE OF ISAAC ON MOUNT MORIAH (GENESIS 22)
  // ==========================================
  { chapterId: 'moriah', type: 'narrative', text: 'And God said, "Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering..."', character: 'God' },
  { chapterId: 'moriah', type: 'narrative', text: 'And Abraham rose up early in the morning, and took Isaac his son, and clave the wood for the burnt offering, and went unto the place of which God had told him.', character: 'Narrator' },
  { chapterId: 'moriah', type: 'narrative', text: 'Then on the third day Abraham lifted up his eyes, and saw the place afar off.', character: 'Narrator' },
  { chapterId: 'moriah', type: 'narrative', text: 'And Isaac spake unto Abraham his father, and said, "My father: behold the fire and the wood: but where is the lamb for a burnt offering?"', character: 'Isaac' },
  { chapterId: 'moriah', type: 'narrative', text: 'And Abraham said, "My son, God will provide himself a lamb for a burnt offering:" so they went both of them together.', character: 'Abraham' },
  { chapterId: 'moriah', type: 'narrative', text: 'And they came to the place which God had told him of; and Abraham built an altar there, and laid the wood in order...', character: 'Narrator' },
  { chapterId: 'moriah', type: 'narrative', text: 'And the angel of the LORD called unto him out of heaven, and said, "Abraham, Abraham! Lay not thine hand upon the lad, neither do thou any thing unto him: for now I know that thou fearest God."', character: 'Angel' },
  { chapterId: 'moriah', type: 'narrative', text: 'And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham offered him up for a burnt offering in the stead of his son.', character: 'Narrator' },
  { chapterId: 'moriah', type: 'interactive', target: 'altar', instruction: '<span class="goal-tag">🎯 GOAL</span> Approach the altar on the heights of Mount Moriah to behold the ram provided by the LORD.' },

  // ==========================================
  // JACOB\'S LADDER AT BETHEL (GENESIS 28)
  // ==========================================
  { chapterId: 'bethel', type: 'narrative', text: 'And Jacob went out from Beersheba, and went toward Haran.', character: 'Narrator' },
  { chapterId: 'bethel', type: 'narrative', text: 'And he lighted upon a certain place, and tarried there all night, because the sun was set; and he took of the stones of that place, and put them for his pillows, and lay down in that place to sleep.', character: 'Narrator' },
  { chapterId: 'bethel', type: 'narrative', text: 'And he dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven: and behold the angels of God ascending and descending on it.', character: 'Narrator' },
  { chapterId: 'bethel', type: 'narrative', text: 'And, behold, the LORD stood above it, and said, "I am the LORD God of Abraham thy father, and the God of Isaac: the land whereon thou liest, to thee will I give it, and to thy seed..."', character: 'God' },
  { chapterId: 'bethel', type: 'narrative', text: 'And Jacob awaked out of his sleep, and he said, "Surely the LORD is in this place; and I knew it not. This is none other but the house of God, and this is the gate of heaven."', character: 'Jacob' },
  { chapterId: 'bethel', type: 'interactive', target: 'ladder', instruction: '<span class="goal-tag">🎯 GOAL</span> Step toward the pillow of stone at Bethel and behold the celestial ladder of angels reaching unto the throne of God.' }
];

export const scenes = rawScenes.map((s, idx) => {
  const id = idx + 1;
  if (s.type === 'narrative') {
    const charName = s.character.toLowerCase();
    const config = CHARACTER_CONFIG[charName] || CHARACTER_CONFIG.narrator;
    const cacheKey = makeCacheKey(s.text, config.voice);
    return {
      id,
      ...s,
      voice: config.voice,
      speed: config.speed,
      status: 'idle',
      cacheKey,
      audioBuffer: null,
      durationMs: 0,
      animationTimeline: null
    };
  } else {
    return {
      id,
      ...s,
      status: 'ready' // Interactive states are immediately ready
    };
  }
});
