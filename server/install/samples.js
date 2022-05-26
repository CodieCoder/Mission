const Pool = require("pg").Pool;
const { md5 } = require("pg/lib/utils");
const config = require("../config/config");

const pool = new Pool(config);

let user = md5("Jimmy");

let sender = [
  "Mike Amaka",
  "Codee",
  "Viktor Khiv",
  "Yahoo!",
  "King Nonso",
  "Mane Salah",
  "Mailee Admin",
  "Coinbase",
  "Kendrick Lamar",
  "Last Guy",
];
let date = [
  "5/26/2022",
  "5/25/2022",
  "5/24/2022",
  "5/23/2022",
  "5/22/2022",
  "5/21/2022",
  "4/26/2022",
  "4/24/2022",
  "4/23/2022",
  "3/03/2022",
];
let subject = [
  "You won the contract!",
  "Let's get the job going",
  "These are random subjects!",
  "Wake Up!",
  "How are you doing today?",
  "Do you need an upgrade on your account?",
  "Go hard or go home!!!",
  "Why are you still awake?",
  "You should be careful these days.",
  "Sorry, but you're awesome!",
];
let content = [
  " Snip, snip, snip. I’m becoming something new. I was a bolt of fabric, long and wonderful and wrapped many times around myself, hugging my own form. I had once been thread, a multitude of threads, and maybe even something else before that, but who can be expected to remember that far? Those threads were stretched tight and woven one over the other, again and again. Woven so tightly I became a taut impenetrable thing, not a hole to be seen. ",
  "The canister had always been there, rolling around at the bottom of his duffle bag. Whenever he packed, his fingers would graze over the smooth, gray top, but he’d never take it out, never look directly at it. Sometimes when he unpacked, the canister would get wound up in a dirty sock or wedged inside a pocket, and it would come up with a handful of laundry as he went to chuck it into the machine.",
  "Swearing My cat, Oreo, is the best poker partner I've ever had. Hands down—no pun intended. Don't let those old Coolidge paintings fool you; dogs really don't know what the hell they're doing once you sit them on that rickety ladder back chair, and their paws just aren't made for holding the cards steady.",
  "You present me with a gift bag as if legions of angels will descend, trumpeting your thoughtfulness in remembering my [insert celebratory event here]. I’m gracious, of course. You shouldn’t have!And I mean that. You shouldn’t have. Because now you are stepping over the line.",
  "She was surprised, sure enough. But she was also curious. Her face concealed nothing, and that was what fascinated me. As she walked through the gallery, each piece evoked something unique from inside her, and she did not bother to mask it. Anyone could read the critique in her face, if they took the time. It is an artist's dream – to clearly see the emotions we inspire with our work.Many had passed by my work since the showing began, pausing for a moment, offering a quick word of praise. ",
  "Can you hear me?I remember being reborn a thousand times.In the between-times, and at the very start and end of a life, the memories are strong. I remember the warmth of the sun on my crumpled wings as they unfold for one brilliant bright day of flight. I relive the elation of the chase and the sinking of my teeth into the throat of my prey- what a joy it is to satisfy physical hunger.",
  "There are still rusted bayonets to be found in the dirt. Alongside broken firearms, canteens, and bullet-struck helmets. At times, still attached to skeletons. The deep-sea team would occasionally find a corroded tank or the remains of a submarine acting as an aquarium. Fighter planes would turn up far off in the mountains, a surprise to climbers. ",
  "Humans can transform from solid to spirit in about half a second. I just found this out. Just a half-second ago.  I might be shocked if I weren’t so dead. “Huh,” is all I have to say about it. “Yep,” my wife agrees, equally shockless. ",
  "I met the love of my life at someone else’s prom.He wasn’t my date.My date was a lovely young woman whose name I can’t remember. What I do remember is that her dress was blue the way Southern debutantes in movies always wear blue dresses. At least from the movies I’ve seen. It was blue, but not puffy, and I was grateful for that. I’m resistant to puffy. Puffy and poofy. I can’t tolerate either.",
  "I remember our first cigarettes together were Rothmans, middle tar, with a filter, of course. It was ten o’clock on a Saturday night and we were attending a local church’s youth club disco. I recall that she’d gone outside for a breath of air.God, I could do with a gasper, she’d said, avoiding my gaze, as if we were on stage and I’d forgotten my lines while searching for a prop. I groped around inside my jacket for my pack of Rothmans.",
];

async function Querying(sender, date, subject, content) {
  const query = await pool.query(
    "INSERT INTO mailbox (user_id, sender, date, subject, content, isRead) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [user, sender, date, subject, content, "FALSE"]
  );
  console.log(query.rows);
}

for (let i = 0; i < 10; i++) {
  Querying(sender[i], date[i], subject[i], content[i]);
}
