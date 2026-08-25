import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const articles = [
  {
    title: "Why I Wrote a Dog Book When Everyone Said Don't",
    excerpt: "Every single person I asked told me the same thing. Don't write a dog book. There are too many. The shelf is full. You'll get buried. I wrote it anyway, and here's why that was exactly the right reason to do it.",
    content: `The first person who told me not to write a dog book was someone I trusted. They said it with good intentions. "The market is saturated. You're going up against Cesar Millan and every influencer with a golden retriever." I nodded. I heard them. Then I wrote the book anyway.

The second person said it differently. "Dog books don't sell unless you're already famous." The third person said, "There's nothing new to say about dogs." The fourth said, "You should write something more business-oriented. That's your audience."

I kept a mental tally. By the time I started outlining "Before You Say Yes to the Dog," roughly twelve people had told me it was a bad idea. Not one of them was mean about it. They were being practical. They were looking at the same market data I was looking at. And they were right about one thing: there are a lot of dog books.

But here's what I noticed. The dog books that existed fell into a few categories. Training manuals. Breed guides. Memoirs about a specific dog. Coffee table photography books. What was missing was the book I kept wishing existed when families came to me with their dog problems. The one that sat down with you before you made the decision and said, "Okay, let's actually think about this."

I wasn't writing a training book. I wasn't writing a breed encyclopedia. I was writing the book about the decision itself. The conversation that should happen before the dog arrives, not after the dog is already shredding the couch and the family is in crisis.

That's when it clicked for me. The saturation argument wasn't about too many books. It was about too many of the same book. A crowded shelf doesn't mean there's no room. It means the bar for being different is higher, and most people interpret that as a reason not to try.

I've seen this pattern in business too. People look at a competitive market and decide it's not worth entering. But the most successful products almost always enter crowded spaces. They don't succeed by being the only option. They succeed by being the right option for a specific group of people who felt overlooked.

The families I kept meeting were those people. They didn't need another training guide. They needed someone to say, "Hold on. Let's talk about what you're actually signing up for. Not the cute parts. The whole thing. The morning walks in the rain. The vet bills you're not planning for. The way this animal is going to rearrange your entire household dynamic."

And then I wrote the second book, "After You Say Yes to the Dog," because once people actually got the dog, they needed the follow-up conversation. The one that happens at 2 a.m. when the puppy won't stop crying and you're questioning every decision you've ever made.

Here's what I've come to believe about crowded markets. They're crowded because there's genuine demand. Nobody writes books about things nobody cares about. The crowd is evidence that people want this. Your job isn't to avoid the crowd. Your job is to find the gap inside it.

Twelve people told me not to write these books. Every single one of them had a valid point. But none of them had sat across from a family in tears because they brought home a dog they weren't ready for. None of them had watched a kid bond with a dog and then lose that dog and need help processing it. None of them had seen the specific, messy, human side of dog ownership that I'd been seeing for years.

Sometimes the best reason to do something is that everyone says you shouldn't. Not because being contrarian is a strategy. But because the people telling you not to do it are working from the same information everyone else has. And if you have information they don't—lived experience, a different angle, a specific audience you understand—then the crowd's opinion is based on an incomplete picture.

I wrote a dog book because the dog book I needed didn't exist. And if it didn't exist for me, it didn't exist for a lot of other people either. That's not arrogance. That's just paying attention.

The shelf was full. It still is. There's room for one more if it's the right one.`
  },
  {
    title: 'The Day I Finished the First Draft',
    excerpt: 'People imagine the end of a first draft as this cinematic moment. Confetti. Relief. Pride. Here is what actually happened when I typed the last word of my first dog book.',
    content: `I remember the exact moment I finished the first draft of "Before You Say Yes to the Dog." I remember it because it was nothing like what I expected, and the gap between expectation and reality stuck with me.

It was a Tuesday. Late afternoon. I was sitting at my desk, which is really just the dining table with a laptop on it. The last paragraph was about something specific—I don't remember what now—but I knew it was the end because I had an outline and I'd finally reached the last section.

I typed the final period. And then I sat there.

Nothing happened. No music swelled. No tears came. I didn't call anyone. I didn't pour a drink. I just sat there looking at the screen thinking, "That's it? That's the whole thing?"

People who haven't written a book imagine the finish line as a moment of triumph. You've seen the movie version. The writer leans back, smiles, maybe prints the manuscript and holds it up. The camera pulls back. Fade to black.

Here's what actually happens. You finish. You feel a brief flicker of something that might be relief. And then, almost immediately, the doubt arrives. Not gentle doubt. The aggressive kind. The kind that says, "You just spent months on this and it's not good enough. You know it's not good enough. You've read enough books to know what good writing looks like and this isn't it."

I saved the file. I closed the laptop. I made dinner. The manuscript sat there on my hard drive like a thing I wasn't sure I wanted to look at again.

That night I couldn't sleep. Not because I was excited. Because I was already rewriting in my head. The second chapter felt weak. The transition between sections seven and eight was clumsy. I'd used the word "important" fourteen times in one chapter, which is a sign of lazy thinking. The ending was abrupt. The whole thing was probably 15,000 words too long or 10,000 words too short. I had no idea which.

The anticlimax of finishing a first draft is something nobody warns you about. You spend months—years, in some cases—working toward this moment. You build it up in your head. You imagine the feeling. And when it arrives, the feeling is closer to exhaustion than elation.

There's a reason for this. The first draft isn't the finish line. It's the starting line. Every experienced writer knows this, but nobody tells beginners because it sounds discouraging. So beginners finish their first draft and expect to feel done, and instead they feel like they've just agreed to do the whole thing over again, only better this time.

That's exactly what happened. The next morning I opened the file, read the first three pages, and started editing. The draft I'd "finished" the day before was about to go through four more major revisions before anyone else would see it.

I'm telling you this because I think the mythology around finishing is harmful. It sets people up for disappointment. When you finish your first draft and feel nothing, you think something is wrong with you or the book. Probably both. But nothing is wrong. This is just what it feels like.

The real moment of satisfaction came much later. Not when I finished writing, but when someone I didn't know told me they'd read the book and it made them think differently about getting a dog. That was the moment. Months after the draft. Months after the edits. Months after the publishing process. Some stranger, somewhere, had found the book useful.

The day I finished the first draft was a Tuesday. I ate leftover rice for dinner. I went to bed anxious. I woke up and started over. That's the real story. It's not glamorous. But it's honest, and honestly is more useful than the version with confetti.`
  },
  {
    title: 'What My Editor Said That I Didn\'t Want to Hear',
    excerpt: 'My editor read the manuscript and said the thing I knew she was going to say but hoped she wouldn\'t. What came next changed the book and, honestly, changed how I think about feedback.',
    content: `I sent the manuscript to my editor with a confidence I didn't actually feel. That's a specific kind ofperformance most writers are familiar with. You hit send and immediately start imagining the response. You hope for praise. You prepare for criticism. What you don't prepare for is the feedback that is accurate in a way that stings because you already knew it was true.

My editor read the full manuscript of "Before You Say Yes to the Dog" and came back with something like this: "The information is good. The stories are good. But you're hiding behind the information. The reader doesn't feel you in this book. They feel a teacher. I think they need to feel a person."

I read that email three times. Each time it landed the same way. She was right. I knew she was right the second I read it, which made it worse. It's one thing to get feedback you disagree with. You can dismiss that. It's another thing to get feedback you've been avoiding in your own head for months.

What she was pointing to was a choice I'd made without realizing I'd made it. I had written the book from behind a wall of expertise. Here's what you should know. Here are the facts. Here's the framework. Clean, organized, useful. And completely devoid of the thing that would actually make someone keep reading: a human voice.

I had done this on purpose, sort of. I was afraid that if I made the book too personal, it would seem unprofessional. I was writing about dog ownership and family decisions. I wanted it to be taken seriously. So I made it clinical. I removed myself from the pages and replaced myself with authority.

The problem is that authority doesn't connect with people. Not on its own. People connect with people. They connect with honesty, with vulnerability, with the sense that the person writing has actually lived through the thing they're writing about. I had lived through it. I just wasn't letting the reader see that.

My editor didn't just identify the problem. She told me specifically what to change. She pointed to chapters where I'd described a family's dog problem in clinical terms and said, "You were there. You talked to these people. What did you actually feel? Put that in."

This was hard. Not technically hard. Emotionally hard. Writing about your feelings about other people's dog problems sounds absurd when you say it out loud. But that's what makes a book work. Not the facts. The human reaction to the facts.

I rewrote significant portions of the book. Not the structure. Not the core ideas. But the voice. I went back through every chapter and asked myself: would I say this to a friend sitting across from me at a coffee shop? If not, I rewrote it until it sounded like something I'd actually say.

The result was a better book. Not because the information changed. Because the delivery changed. The same content, delivered with a human behind it instead of a podium in front of it.

Here's what I learned from that experience. Good feedback doesn't tell you that you're wrong. It tells you what you already know but have been refusing to act on. The best editors don't impose their vision. They hold up a mirror. And if you're honest with yourself, you already see the problem before they point to it.

The hard part isn't hearing the feedback. The hard part is admitting you needed to hear it.

I've since sent the same editor everything I've written. Not because she's always right. Because she's willing to say the thing I don't want to hear, and I've learned that the thing I don't want to hear is usually the thing that matters most.

If you're writing something and you're hiding behind expertise, stop. The expertise is the least interesting part of you. The person who holds the expertise—that's the part people want to read.`
  },
  {
    title: 'Why This Book Almost Didn\'t Get Published',
    excerpt: 'There was a moment, about eight months into the project, where I sat with the manuscript and seriously considered walking away. Not because it was bad. Because I wasn\'t sure it mattered.',
    content: `Eight months into writing "Before You Say Yes to the Dog," I hit a wall. Not a writer's block wall. A meaning wall. I was sitting at my desk at 11 p.m. on a weeknight, and I asked myself a question I couldn't answer: does this book actually matter?

Not "is it good?" I could assess quality. Not "will it sell?" I had no idea, and that was a different kind of problem. The question was more fundamental. Is there a reason for this book to exist in the world? Is it saying something that needs to be said? Or am I just adding noise to an already noisy shelf?

This wasn't imposter syndrome. I've had that, and it feels different. Imposter syndrome whispers, "You're not good enough." This was whispering something more unsettling: "Even if you're good enough, so what?"

I put the manuscript in a drawer. Not a metaphorical drawer. An actual drawer. I printed it out, put it in a manila folder, and slid it into the bottom drawer of my desk. I told myself I'd take a week off and come back to it with fresh eyes.

The week turned into two. Then three. I didn't open the drawer. I went about my life. I worked on other things. I didn't tell anyone I'd stopped writing because stopping felt like admitting failure, and I wasn't ready to admit that.

What brought me back was a conversation I didn't expect. A friend of a friend reached out to me out of the blue. They were thinking about getting a dog for their family. They'd heard I knew about this stuff. Could they ask me a few questions?

We talked for an hour. The questions they asked were the exact questions I'd written about in the manuscript. The same doubts, the same blind spots, the same family dynamics I'd been trying to capture. As I listened to them talk through their situation, I realized something. The book wasn't noise. It was the conversation nobody was having with them before they made the biggest pet decision of their life.

I went home that night and opened the drawer.

The manuscript was still there. Still incomplete. Still imperfect. But it wasn't pointless. I'd just lost sight of why I started because I'd been staring at the words for too long and had forgotten the people the words were for.

This is the part of the creative process that doesn't show up in interviews or launch posts. The part where you genuinely consider quitting. Not as a dramatic gesture, but as a real option that you're weighing with real seriousness. Because the honest truth is that most projects could be abandoned and the world wouldn't notice. The question is whether you notice. Whether the work matters to you enough to finish even if it doesn't matter to anyone else.

For me, the answer turned out to be yes. But it took almost losing the book to figure that out. Sometimes you don't know what you have until you're about to walk away from it.

I finished the manuscript three months later. Then I wrote the second one. Then I published both. The books exist now because a stranger asked me a question at exactly the moment I needed to be reminded why I was writing in the first place.

I don't think that's a coincidence. I think that's how it works. You put something out into the world and the world tells you whether it needs it. Not through sales numbers or reviews. Through individual moments where someone says, "I needed to hear this."

The book almost didn't get published because I almost didn't finish it. I almost didn't finish it because I forgot who it was for. The moment I remembered, the reason came back. Not all at once. But enough to keep going. And sometimes enough is all you need.`
  },
  {
    title: 'The Part of Writing Nobody Talks About',
    excerpt: 'Everyone wants to hear about inspiration. The moment the idea struck. The creative breakthrough. Nobody wants to hear about the six months I spent reformatting citations and checking facts. But that\'s where the book actually got made.',
    content: `When people ask about writing a book, they want to hear about the creative parts. The moment the idea came to you. The late-night writing sessions where the words just flowed. The breakthrough that changed everything. I understand the impulse. Those are the interesting parts.

But they're not the parts that take the most time. Not even close.

The part of writing nobody talks about is the repetitive, unglamorous, mind-numbing work that makes up the bulk of the process. For me, writing "Before You Say Yes to the Dog" and "After You Say Yes to the Dog," this meant months of work that would bore you to tears if I described it in detail. So I'll describe it in detail.

Fact-checking. Every statistic, every claim, every piece of data in the book had to be verified. You know how long this takes? Forever. You find a statistic that says "40% of dog owners" something something. Then you have to find the original source. The original source leads you to a study from 2017 with a sample size of 200 people in one city. You have to decide whether that's reliable enough to cite. Then you have to format the citation correctly. Then you move on to the next one. There are dozens of these.

Organizing chapters. The first draft had a structure that made sense to me while I was writing it. When I read it back, chapters four and five were in the wrong order. So I moved them. Then chapter six didn't flow from the new chapter five. So I rewrote the transition. Then I realized chapter three repeated a point from chapter one. So I cut the repetition. Then chapter three was too short. So I expanded it. This loop repeated more times than I want to admit.

Formatting. The manuscript had to meet specific publisher requirements. Margins, font size, line spacing, heading styles. Someone has to do this. That someone was me. I spent entire days on formatting. Not writing. Not thinking. Just making sure the document looked right.

Reading the same thing over and over. I read my own manuscript so many times that the words lost meaning. I'd be reading a paragraph and realize I had no idea what it said because I'd memorized the shape of the sentences without actually processing the content. That's a real thing. It's called semantic satiation, and it's miserable.

Permissions. If you quote someone, you might need permission. If you reference a specific study, you might need to confirm the rights. Each of these is a small task, but there are a lot of them, and each one can take a week of back-and-forth with publishers or rights holders.

The index. Someone has to create the index at the back of the book. Do you know how tedious that is? You go through every page and identify terms that readers might want to look up. Then you list them alphabetically with page numbers. Then you check that the page numbers are correct. Then you recheck them after the final layout shifts everything by two pages.

All of this work took more time than the actual writing. The writing—the creative part that people picture when they think about authoring a book—was maybe 20% of the total time spent. The other 80% was the invisible machinery that turns a draft into a book.

I'm not complaining. Or maybe I am, a little. But the point is not that this work is unfair. The point is that nobody tells you about it. Aspiring writers have no idea what they're signing up for. They think writing a book means writing. It doesn't. It means writing, and then doing a hundred other tedious things that nobody will ever credit you for.

If you're thinking about writing a book, factor this in. The creative part is the fun part, and it's also the smallest part. The rest is discipline, patience, and a willingness to do boring work for months because the finished product requires it.

That's the real book launch story. Not the creative spark. The stubborn, repetitive, invisible work that nobody claps for.`
  },
  {
    title: 'What I Learned About Myself While Writing This Book',
    excerpt: 'I set out to write about dogs and families. I ended up learning more about my own patterns, assumptions, and blind spots than I ever expected. The book changed me before it changed anyone else.',
    content: `You don't write 80,000 words about anything without learning something about yourself. That's not profound. It's just math. When you spend that much time with your own thoughts, you're going to bump into things you didn't know were there.

When I started writing "Before You Say Yes to the Dog," I thought I knew exactly what I believed about dog ownership. I'd been working with families and their dogs for years. I had clear opinions. I had frameworks. I had answers. What I didn't have was the self-awareness to see how many of those answers were shaped by my own experience rather than objective truth.

Here's an example. Early in the writing process, I was working on a chapter about choosing the right breed for your family. I'd written this long section about how people should be realistic about their lifestyle. Don't get a high-energy dog if you work twelve hours a day. Don't get a herding breed if you have no yard. Straightforward, practical advice.

Then I caught myself. I was writing this as if I'd always been practical about dogs. I hadn't. My first dog was a completely impractical choice for my life at the time. I got lucky. The dog adapted. But I didn't make a rational decision. I made an emotional one and rationalized it afterward. And here I was, writing a book telling other people to be more rational than I'd been.

That realization forced me to rewrite the chapter. Not to hide my history, but to include it. Because the truth is that most people don't make rational decisions about dogs. They make emotional ones. And the book needed to account for that reality instead of pretending it doesn't exist.

That was the first of several moments where the writing process held up a mirror I wasn't expecting.

Another one: I realized I had a bias toward certain types of families. In my experience, the families who sought me out tended to be middle-class, two-parent households. They had resources. They had time. They could afford training, vet care, dog walkers. Without realizing it, I'd written the book with that family in mind. The single parent working two jobs? The family living in a small apartment with no car? They were barely in the book.

That was uncomfortable to confront. Because it meant I'd been unconsciously serving one type of reader while telling myself I was writing for everyone. The fix wasn't hard—add more scenarios, more diverse family structures, more acknowledgment that not everyone has the same resources. But the discovery was uncomfortable because it revealed a blind spot I didn't know I had.

The biggest thing I learned, though, was about my relationship with certainty. When I started writing, I was certain about a lot of things. Dogs need this. Families should do that. This approach works. That approach doesn't. Writing the book forced me to slow down and examine each of those certainties. And under examination, many of them crumbled.

Not because they were wrong. Because they were incomplete. They were true for some situations and not others. They were true for certain families and not others. They were true for me and maybe not for you. The book made me more humble about my own expertise. Not less confident. More careful.

I also learned that I process things by writing them. There were concepts I thought I understood until I tried to explain them on paper. Then I realized my understanding was shallow. Writing forced me to go deeper. To ask myself, "But why?" And then, "But why really?" Until I got past the surface answer to something more honest.

If you're considering writing a book, know this going in. The book will teach you things about yourself that you didn't set out to learn. Some of those things will be uncomfortable. All of them will be valuable. Not just for the book. For you.

I wrote two books about dogs and family decisions. I came out the other side knowing more about my own assumptions, biases, and patterns than I did going in. The books are better for it. And so am I.`
  },
  {
    title: "Why I Rejected the Publisher's Suggestion",
    excerpt: 'My publisher had an idea for the title. I listened. I considered it. And then I said no. Here\'s what happened in that conversation and why standing your ground on something this small actually matters.',
    content: `Publishers have opinions. That's part of what you're paying for, in a sense. They understand the market. They know what sells. They've been through this process hundreds of times with hundreds of authors. When they make a suggestion, you should listen.

But listening and agreeing are not the same thing.

When I was in the final stages of preparing "Before You Say Yes to the Dog" for publication, my publisher came back with a suggestion about the title. They felt the title was too long. They proposed a shorter, punchier alternative. I won't tell you what it was because I don't want to embarrass anyone, but it was the kind of title that would have looked great on a bookstore shelf and meant almost nothing.

It was marketable. I'll give them that. It was the kind of title that catches your eye and makes you pick up the book. It was also the kind of title that could have been on a book about literally anything. A cookbook. A fitness guide. A memoir about climbing a mountain. The title was so generic that it erased the specificity of what the book was actually about.

I thought about it for two days. I talked to my editor about it. I talked to friends who were writers. I wrote down the pros and cons. The publisher's suggestion had real merits. It was commercial. It was clean. It would probably sell more copies than my title, at least in the first few weeks when people are browsing by cover.

But it wasn't my book. Not really. It was a version of my book that had been optimized for a spreadsheet.

Here's the thing about titles. The title is the first promise you make to the reader. It tells them what they're about to get into. "Before You Say Yes to the Dog" makes a specific promise. It says: this book is about the decision. It's about the moment before you commit. It's about thinking it through. That's the whole premise. The publisher's suggested title made a different promise. A vaguer one. A more marketable one. But a less honest one.

I called my publisher and explained my thinking. I told them I understood the commercial argument. I told them I appreciated the suggestion. And I told them I wanted to keep my title. Not because I was attached to it emotionally. Because it was accurate. A reader who sees "Before You Say Yes to the Dog" knows exactly what they're getting. A reader who sees the publisher's title would have to read the subtitle to figure it out.

They pushed back a little. I held my ground. Not aggressively. Just firmly. I said, "I understand your position. I think the specificity of the title is part of the value. Let's go with mine."

They agreed. Not happily, maybe. But they agreed.

This was a small moment in the grand scheme of publishing a book. But it taught me something important. When you're creating something, there will be people who want to optimize it. Make it broader. Make it more commercial. Make it appeal to more people. Those instincts are not wrong. But they can dilute the thing that makes your work specific and valuable.

The same thing happened with the cover design. The first version was clean and professional but could have been a book about anything. I asked for changes that made it clearly about dogs and family. The designer wasn't thrilled. The end result was better.

I'm not saying you should reject every suggestion. I rejected plenty of other ideas during the process and accepted many more. The key is knowing which battles are worth fighting. A title is worth fighting for because it's the entry point to the entire book. Get that wrong and nothing else matters.

The publisher knew the market. But I knew the reader. Those are different things. And in this case, knowing the reader was more important.`
  },
  {
    title: 'The Question I Keep Getting Asked About the Book',
    excerpt: 'At every event, every conversation, every interview about the dog books, one question comes up more than any other. And the way people ask it says something revealing about how we think about pets and commitment.',
    content: `"So, are you a dog person or a cat person?"

That's the question. In some form or another, it comes up every time. At book events. In podcast interviews. In casual conversations after someone finds out what I write about. It's the default question people reach for when they hear "dog book," and I've been asked it probably two hundred times now.

I usually say I'm a realist. Which is a dodge, and people know it's a dodge, but it buys me time to think about what the question actually means.

Because here's the thing. The question isn't really about dogs and cats. It's about identity. People ask it the way they'd ask someone their zodiac sign or their enneagram type. They're trying to place you in a category. Dog person means you're outgoing, loyal, active. Cat person means you're independent, introspective, low-maintenance. It's a personality test disguised as a preference question.

And that reveals something interesting about how people think about pets. They don't think of pet ownership as a practical decision. They think of it as an expression of identity. "I'm a dog person" doesn't mean "I prefer the experience of living with a dog." It means "being a dog person is part of who I am."

This is exactly the problem I wrote the books to address.

When you make pet ownership about identity, you stop making rational decisions. You don't ask, "Can I afford this animal? Do I have the time? Is my living situation appropriate? Can I commit to ten to fifteen years of care?" You ask, "Does getting this dog match who I see myself as?"

Those are very different questions with very different outcomes.

I've met families who got dogs because they saw themselves as dog people. The suburban house, the kids, the golden retriever in the yard. It was part of the picture they had of their ideal life. And then the dog arrived and the picture didn't match the reality. The dog needed things they didn't expect to give. The schedule was harder than they imagined. The kids lost interest after two weeks. And suddenly they had an animal they weren't prepared for, bought to serve an image they had of themselves.

I've also met people who didn't see themselves as dog people at all but ended up being incredible dog owners. They approached it practically. They researched. They planned. They made a decision based on capacity and commitment rather than identity. And they were great at it.

So when someone asks me if I'm a dog person or a cat person, what I really want to say is: I don't think that's the right framework. I think the question should be, "Are you a prepared person or an unprepared person?" Because prepared people do well with pets regardless of the species, and unprepared people struggle regardless of how much they love animals.

But I don't say that. It sounds preachy. So I say I'm a realist and we move on.

The question keeps coming up because it's easy and it's fun and it gives people a way to connect. I get it. I'm not annoyed by it. But I do notice it, and every time someone asks, it reinforces my belief that these books were needed. Because as long as people are framing pet decisions as identity choices rather than practical ones, there's going to be a gap between what they expect and what they get.

The books are about closing that gap. Not by telling people not to get dogs. By telling them to think about it differently before they do.

Next time someone asks me the dog-or-cat question, maybe I'll give the real answer. Maybe I'll say: I'm a person who thinks you should ask better questions. But I probably won't. I'll say I'm a realist and we'll laugh and move on. And I'll write another chapter about it later.`
  },
  {
    title: 'What Publishing Taught Me About Business',
    excerpt: 'I went into publishing thinking it was about writing. I came out realizing it\'s about product development, positioning, and understanding your customer. The parallels to business are everywhere if you\'re paying attention.',
    content: `Nobody tells you that publishing a book is basically launching a startup. The product is different, but the process is nearly identical. And if you pay attention, the lessons transfer.

The first thing I noticed was the similarity between writing a book and building a product. In both cases, you start with an idea you think is good. You invest time and money in developing it. You show it to people. They give you feedback. Some of the feedback is useful. Some of it isn't. You have to figure out which is which. Then you iterate. Then you launch. Then you find out if anyone actually wants what you built.

Sound familiar? It should. It's the product development cycle, and it doesn't matter whether the product is a SaaS app or a book about dogs.

The second parallel is positioning. When I started telling people about the book, I realized I had no idea how to describe it in a way that made sense to them. "It's about dog ownership" was too broad. "It's a guide for families considering getting a dog" was better but still didn't capture it. I went through maybe twenty different descriptions before I found one that made people's eyes light up instead of glaze over.

That's positioning. Finding the right words to put your thing in the right category in someone's mind. Businesses struggle with this constantly. Publishers deal with it too. Where does this book go on the shelf? What section? Who is it for? If you can't answer those questions clearly, the best product in the world will get lost.

Then there's the launch itself. I used to think publishing meant you wrote the book and the publisher did everything else. That's not how it works, at least not for most authors. You're expected to be a marketer. You're expected to have a platform. You're expected to drive interest and sales. The publisher provides distribution and credibility. You provide the audience.

If that sounds like being a founder, it's because it is. You built the product. Now you have to sell it. Nobody is going to do that for you, regardless of what the contract says.

I also learned about pricing. Books are weird because they're cheap. My book costs less than a decent lunch. But the perceived value has to match or exceed the price. If someone pays $15 for your book and feels like they got $15 worth of insight, you've succeeded. If they feel like they got $5 worth, they won't recommend it and they won't buy the next one.

This is the same calculation every business makes. Price versus perceived value. Get it right and you have customers for life. Get it wrong and you have a one-time transaction.

The biggest business lesson from publishing, though, was about iteration. After the first book came out, I listened to what readers said. Not just the reviews—the conversations. What did they wish the book had covered? Where did they feel like they needed more? What questions came up after they finished reading?

That feedback directly shaped the second book, "After You Say Yes to the Dog." It wasn't a sequel in the traditional sense. It was a response to a market need that the first product had revealed. That's product iteration 101. You launch, you learn, you build the next version.

The final lesson is about patience. Books don't sell themselves overnight. Neither do products. You launch and nothing happens. Then a little happens. Then slowly, if you keep showing up, more happens. The authors who succeed aren't necessarily the best writers. They're the ones who keep promoting, keep engaging, and keep believing in the work long after the initial excitement fades.

Publishing taught me that building something is only the beginning. The real work starts when the thing exists and you have to convince people it matters. That's not a publishing lesson. That's a life lesson. But I learned it through books, so here we are.`
  },
  {
    title: 'The Review That Stayed With Me',
    excerpt: 'Most reviews blur together. Positive, negative, three stars, five stars. But one review hit differently. It wasn\'t the best review or the worst. It was the most honest, and it changed how I think about what these books are actually for.',
    content: `I read reviews. I know I said in another piece that I don't, and I'll get to that. But early on, before I developed the discipline to look away, I read them. Most were fine. Some were nice. A few were critical in ways that stung but were probably fair.

One review stayed with me in a way the others didn't.

It was from someone who gave the book three out of five stars. Not a rave. Not a takedown. A middle-of-the-road assessment. They said the information was solid and the approach was sensible. But then they said something I wasn't expecting.

"I wish I'd read this before we got our dog. We made almost every mistake the author describes. We love our dog, but this book would have saved us a lot of stress. I'm giving it to my sister who's thinking about getting one."

Three stars. And yet that review did more for how I think about the book than any five-star praise could have.

Here's why. That reviewer was the exact person I wrote the book for. Not someone who was currently dog shopping and wanted a guide. Someone who already had the dog and was living with the consequences of not having thought it through. They couldn't go back and change their decision. But they could pass the book to someone who hadn't made the decision yet. That's the chain I was hoping to create.

The five-star reviews mostly said things like "great advice" and "very helpful." Fine. Appreciated. But generic. The three-star review told me a story. It showed me the book working the way I intended it to work, just one step removed. The reader didn't benefit directly. Their sister would.

That's the thing about books like this. The ideal reader isn't always the buyer. The ideal reader is the person the buyer hands the book to. The friend who mentions they're considering a dog. The sibling who's kids have been begging for one. The coworker who just moved to a house with a yard and is thinking a dog would complete the picture.

I didn't write these books for the person who already knows everything about dogs. I wrote them for the person who knows nothing and is about to make a decision they can't easily undo. And that person rarely buys the book themselves. Someone who cares about them does.

That review reframed how I thought about marketing, too. Instead of trying to reach prospective dog owners directly—which is nearly impossible because you can't identify them before they self-identify—I should be reaching people who know prospective dog owners. Friends, family members, veterinarians, trainers. The people who are in a position to say, "Read this before you do anything."

The review also made me feel something I didn't expect to feel from a three-star assessment: gratitude. This person took the time to write something honest. They didn't exaggerate their praise. They didn't minimize their experience. They just told the truth. And their truth was more useful to me than the polished praise of someone who loved the book for generic reasons.

I've thought about that review dozens of times since. It shaped how I wrote the second book. It shaped how I talk about both books when people ask. It shaped my understanding of what success looks like for this kind of work.

Success isn't a perfect rating. It's a book that moves from one person to the next because someone said, "You need to read this." Not because it's the best book ever written. Because it showed up at the right moment and made someone think harder about a decision that matters.

One three-star review taught me more about my audience than all the five-star ones combined. Sometimes the feedback that matters most isn't the loudest. It's the most specific.`
  },
  {
    title: 'Why the Second Book Was Harder Than the First',
    excerpt: 'Everyone told me the first book would be the hard one. They were wrong. The first book was hard because I didn\'t know what I was doing. The second book was harder because I knew exactly what was at stake.',
    content: `When I finished "Before You Say Yes to the Dog," I felt a kind of exhausted relief. The book existed. It was done. Whatever happened next was out of my hands to some degree. I'd written the thing I needed to write.

Then I started thinking about the second book.

The second book, "After You Say Yes to the Dog," was always part of the plan. The first book covered the decision. The second book would cover what happens after the decision. Two halves of one conversation. But knowing it was part of the plan and actually writing it turned out to be very different experiences.

The first book was hard in the way that anything is hard when you're doing it for the first time. I didn't know if I could write 80,000 words that held together. I didn't know if the structure would work. I didn't know if anyone would care. The uncertainty was massive, but it was also freeing. When you don't know what you're doing, you can't be too hard on yourself. You're learning. Mistakes are part of the process.

The second book was different because I knew exactly what I was doing. I knew the standard I was capable of. I knew what a finished manuscript looked like. And I knew that people were going to compare the second book to the first. Not abstractly. Directly. "Is this as good as the first one? Is it better? Is it worse?"

That comparison was the hardest part. Not the writing. The awareness of the comparison. Every sentence I wrote for the second book, I was also imagining someone reading it and thinking, "His first book was better."

There was also the problem of sophomore energy. The first book was fueled by urgency. I had something to say and I needed to say it. The second book didn't have that same urgency. It was more like a continuation. An extension. And continuations are harder to get excited about. The fire that drove the first book had burned down to embers by the time I started the second one.

I had to find a new source of motivation. Not urgency, because the situation wasn't urgent anymore. Something else. What I found was responsibility. People had read the first book. Some of them had told me it changed how they thought about getting a dog. That meant the second book wasn't just a follow-up. It was a promise. I'd told people there was more to say about life after the dog arrives. Now I had to deliver on that.

The second book was also harder because the topic was messier. "Before You Say Yes to the Dog" is about a decision. Decisions have a shape. They have a before and an after. "After You Say Yes to the Dog" is about living with a choice. Living with a choice is shapeless. It goes on for years. It changes as circumstances change. There's no neat ending. The dog gets older. The kids grow up. The family moves. The situation keeps evolving and the advice has to evolve with it.

That structural challenge took me months to solve. The first book had a natural arc: think about it, prepare for it, decide. The second book didn't have an arc. It had a landscape. A wide, messy, ever-changing landscape of problems and solutions and adjustments. Organizing that into something readable was the hardest structural problem I've faced as a writer.

I don't think any of this is unique to me. Most authors will tell you the second book is harder. The first book is written on instinct and desperation. The second book is written on craft and obligation. Both can produce good work. But the second one takes more out of you.

If you're working on a follow-up to something that was well-received, the pressure is real. Not imaginary. Real. The best thing you can do is acknowledge it, accept that the process will be different, and refuse to let the comparison game drive your decisions. Write the book that needs to be written. Not the book that tries to outdo the last one.

The second book was harder. I'm proud of it anyway. Maybe because it was harder.`
  },
  {
    title: 'What Happens After You Hit Publish',
    excerpt: 'Hitting publish feels like the end. It\'s not. It\'s the beginning of a completely different kind of work that nobody prepares you for and nobody wants to talk about.',
    content: `There's a moment right after you hit publish where everything feels suspended. The book is out. It exists in the world. You've done the thing you've been working toward for months or years. And for about forty-eight hours, you feel something close to peace.

Then reality arrives. And reality is not a victory lap.

What happens after you hit publish is a different kind of work. It's not writing. It's not editing. It's not the creative stuff you signed up for. It's marketing, outreach, follow-up, and a relentless, ongoing effort to make sure the book you just spent months creating doesn't disappear into the void.

The first thing that happens is nothing. You publish the book and nothing happens. No flood of sales. No instant reviews. No emails from strangers saying the book changed their life. There's just silence. The book is out there, and the world has not noticed.

This silence is normal. But it doesn't feel normal. It feels like failure. You start checking the sales dashboard every hour. You start Googling the book title to see if anyone's mentioning it. You start refreshing the review page hoping someone, anyone, has said something.

Then the real work begins. You have to create demand for a thing that already exists. This is backwards from how most people think about it. They imagine that publishing creates attention. It doesn't. Publishing creates availability. The attention part is entirely up to you.

You start reaching out to podcast hosts, hoping they'll have you on. Most won't respond. Some will say no politely. A few will say yes. You prepare for each interview like it matters, because it does. Every conversation is a chance to reach someone who's never heard of the book.

You write guest posts. You pitch articles. You post on social media, not because you enjoy it, but because the algorithm demands it. You show up in Facebook groups about dogs and try to be helpful without being promotional. You answer questions on forums. You do everything you can to put the book in front of people who might need it.

You also deal with the logistics. The author copies that were promised. The bookstore events that need to be scheduled. The speaking engagements that require slides and preparation. The feedback from early readers that you need to address. The typos someone found on page 87 that you now can't stop thinking about.

None of this is glamorous. None of it is what you pictured when you imagined being an author. But it's the job. The writing was the first job. This is the second job. And the second job takes at least as much time as the first one did.

The emotional part is harder to describe. After you publish, you're no longer in control of the book's reception. You can control the marketing. You can control the outreach. But you can't control what people think of the work. You can't control whether they like it, hate it, or ignore it. That loss of control is unsettling.

You also have to deal with the post-project void. For months, your life was organized around this book. You had a purpose. A mission. Something to wake up and work on. Now the book is done and the mission has shifted from creating to promoting, and promoting doesn't fill the same space in your brain. There's a hollowness that's hard to explain to people who haven't been through it.

What I want people to understand is this: publishing is not the finish line. It's the starting line for a marathon you didn't train for. The book needs you just as much after it's published as it did before. Maybe more. Before publication, the book needed you to write it. After publication, the book needs you to fight for it.

If you're not willing to do that fighting, think hard about why you're publishing. Because the book won't fight for itself. Nobody else will fight for it either. It's yours. The work doesn't end when you hit publish. In many ways, it's just beginning.`
  },
  {
    title: 'The Mistakes I Made Marketing My First Book',
    excerpt: 'I did almost everything wrong when it came to marketing the first book. Not out of negligence. Out of inexperience. Here are the specific things I\'d do differently, and what I learned from each one.',
    content: `Marketing a book is a skill. I did not have that skill when "Before You Say Yes to the Dog" came out. I had the writing skill, or at least enough of it. I had the subject matter expertise. What I didn't have was any idea how to get the book in front of the people who needed it.

Mistake number one: I waited too long to start. I didn't think about marketing until the book was already published. That's like building a restaurant and not telling anyone about it until the day you open the doors. By the time I started reaching out to people, the book had been out for weeks and the initial momentum—which should have been the strongest window—was already gone.

What I'd do differently: start building awareness at least three months before publication. Tease the book. Share excerpts. Talk about the ideas. Build an email list of people who are interested in the topic. By launch day, there should be people waiting for the book to arrive. There weren't. There was just me, pressing publish and hoping someone would notice.

Mistake number two: I tried to reach everyone instead of someone. My marketing was broad and generic. I posted on social media about the book without targeting any particular audience. I wrote posts that said things like "my book is out now, check it out" as if that would compel anyone to do anything. It didn't. Broad messaging reaches nobody effectively.

What I'd do differently: identify the specific audiences most likely to need the book and tailor the message to each one. Families with young children who are considering a dog. First-time dog owners who are struggling. People who work in vet offices and pet stores who could recommend it to customers. Each audience needs a different message. I treated them all the same, and the result was noise that nobody responded to.

Mistake number three: I didn't leverage the people who already knew me. I had a network. I had people who respected my work in the dog and family space. I was too proud or too shy or too something to ask them for help. I didn't want to feel like I was imposing. So I didn't ask. And they didn't know the book existed.

What I'd do differently: send a personal email to every person in my network who might be willing to share the book with their audience. Not a mass email. A personal one. "Hey, I wrote a thing. I think the people who follow you would find it useful. Here's why." Most people want to help. They just need to be asked clearly and specifically.

Mistake number four: I ignored reviews. Not by choice—by neglect. People left reviews and I didn't respond to any of them. Not the good ones, not the bad ones. I just let them sit there. This was a missed opportunity on two fronts. The positive reviews could have been shared as social proof. The critical reviews could have been engaged with to show I was listening.

What I'd do differently: respond to every review. Thank the person for reading. Engage with their specific points. This builds relationship and visibility. Every review response is a small marketing moment that most authors waste.

Mistake number five: I ran out of energy too fast. I marketed aggressively for about three weeks after launch and then... stopped. Life got in the way. Other projects demanded attention. The book faded from my daily focus. But books have a long tail. The marketing should too. I treated it like a sprint when it should have been a marathon.

What I'd do differently: create a marketing calendar that extends at least six months past launch. One outreach activity per week. One social media post per week. One conversation with a potential partner or reviewer per month. Consistent, sustainable effort over time beats a burst of intensity followed by silence.

I made all of these mistakes and the book still found its audience. Slowly. Eventually. But it found them in spite of my marketing, not because of it. I'd rather get the results I got with good marketing than the results I got with bad marketing. Because good marketing would have reached more people, faster, with less effort.

Live and learn. Then apply what you learned to the next one.`
  },
  {
    title: 'Why I Don\'t Read My Own Reviews',
    excerpt: 'It took me a while to develop this discipline. But at this point, I don\'t read reviews of my books. Not the good ones. Not the bad ones. Here\'s why this matters more than you think.',
    content: `I wasn't always this way. When the first reviews of "Before You Say Yes to the Dog" started appearing, I read every single one. The good ones made my day. The bad ones ruined my week. The middling ones confused me because I couldn't tell if they were closer to good or closer to bad.

This went on for a few months. Then I noticed something. My mood was being determined by strangers on the internet. Not by the quality of my work. Not by whether the book was achieving what I wanted it to achieve. By whether the last person who left a review happened to like it or not.

That's no way to live. And more importantly, it's no way to write.

Here's the problem with reading reviews. They pull you out of your own compass and into someone else's. When you write a book, you have a reason for writing it. You know who you're writing for. You know what you want the book to do. Reviews don't care about any of that. A reviewer is evaluating the book based on their own expectations, their own needs, their own criteria. Those criteria might align with yours. They might not.

When they don't align, the review can be confusing. A one-star review that says, "This book didn't teach me how to train my dog" misses the point entirely, because training isn't what the book is about. But reading that review still stings. Even though you know it's not a fair evaluation, the one star sits there, and it's hard not to take it personally.

And the positive reviews have their own problem. They can make you complacent. A five-star review that says, "Best book ever, nothing to improve" feels great but gives you nothing to work with. If you believe the praise too much, you stop growing. You stop pushing yourself to be better because the reviews say you're already there.

The truth about reviews is that they're not written for the author. They're written for other readers. That's who they serve. And that's fine. Reviews are a valuable part of the ecosystem. They help readers decide whether a book is right for them. But they were never meant to be feedback for the person who wrote the book.

I made a decision at some point to stop reading them. Not out of arrogance. Out of self-preservation. I need to write the next book from a place of internal clarity, not external approval or disapproval. If I'm constantly checking reviews, I'm constantly adjusting my sense of the work based on other people's reactions. That makes the work worse, not better.

This doesn't mean I don't care what readers think. I do. I care a lot. But I get that feedback in other ways. Conversations at events. Emails from readers. Discussions with people in the dog community. That feedback is specific, contextual, and actionable in ways that a star rating and two sentences on Amazon never will be.

There's also the question of volume. If you have ten reviews, you can process them. If you have a thousand, you can't. The signal-to-noise ratio gets worse as the number of reviews grows. You start seeing patterns that may not be real. You over-index on the most recent or the most extreme. You lose perspective.

The discipline of not reading reviews is hard to develop. Every instinct tells you to check. Just one more. Just the new ones. Just to see. But the checking never stops once it starts. It becomes a habit, and the habit doesn't serve you.

I know what I wrote. I know why I wrote it. I know who it's for. If the book is reaching those people and helping them, the reviews don't matter. If it's not reaching them, the reviews still don't matter—because the reviews won't tell me why. They'll just tell me how random people felt about a thing they may or may not have been the right audience for.

Write the book. Put it out. Let the reviews do what they do for the readers who need them. And get back to work.`
  },
  {
    title: 'What I Want This Book to Do That No Marketing Can Achieve',
    excerpt: 'I have an ambition for these books that doesn\'t fit in a marketing plan. It\'s not about sales or rankings or reviews. It\'s about something that happens between two people in a kitchen, late at night, having a conversation they wouldn\'t have had otherwise.',
    content: `I want to tell you what I actually want these books to do. Not what I tell publishers. Not what I put in press releases. Not what sounds good in an interview. The real thing. The thing I think about when I'm alone with my thoughts and being honest with myself.

I want these books to start a conversation that wasn't going to happen otherwise.

Here's the scenario I picture. It's not a dramatic scene. It's quiet. A couple is sitting at their kitchen table after the kids are in bed. One of them says, "The kids keep asking for a dog." The other one says, "I know. My sister sent me this book. Have you looked at it?" And then they look at it together. Not because they're book people. Because someone they trust put it in their hands and said, "Read this before you decide."

That's it. That's the whole ambition. Two people, a kitchen table, a conversation that's more honest than it would have been without the book.

I don't need everyone to read these books. I need the right person to read them at the right moment. The moment when they're about to make a decision that will affect their family for the next decade. If the book makes them pause and think for thirty seconds longer than they would have otherwise, it's done its job.

Marketing can't do this. Marketing can put the book in front of people. Marketing can create awareness. But marketing can't make someone hand the book to their sister. Marketing can't create that moment of trust where one person says to another, "I think you need this."

That moment is created by the book itself. By whether it's honest enough and specific enough that someone who reads it thinks, "I know exactly who needs to see this." That's a high bar. It means the book can't be generic. It can't try to please everyone. It has to be sharp enough and real enough that it creates an impulse to share.

I've seen it happen a few times now. Someone tells me at an event, "I bought this for my daughter." Or, "I gave this to my neighbor after they got a puppy and were overwhelmed." Those moments are worth more to me than any sales figure. Not because I don't care about sales—I do, books need to sell to stay in print. But because those moments are the actual purpose of the work.

There's something else too. I want the books to be part of a cultural shift in how we talk about pet ownership. Right now, the conversation is dominated by two extremes: the people who think dogs are the greatest thing ever and everyone should have one, and the people who think having a dog is irresponsible if you can't provide a perfect life for the animal.

Neither extreme is helpful. Most families live in the middle. They want a dog. They might be able to provide a good life for one. They might not. The honest answer depends on their specific situation. The books are trying to create space for that honest conversation. Not to discourage dog ownership. Not to encourage it. To make it more thoughtful.

I don't know if that's achievable. It might be too much to ask of two books about dogs. But that's the real ambition. Not a bestseller list. Not a thousand reviews. A slow, quiet shift in how families talk about the decision to bring an animal into their home.

If ten years from now, fewer families are making impulsive dog decisions because these books existed, that's enough. If one fewer dog ends up in a shelter because a family thought it through before they acted, that's enough.

That's what I want the books to do. It's not measurable. It's not marketable. It doesn't fit in a press release. But it's the reason I wrote them, and it's the thing that keeps me showing up to talk about them long after the launch window has closed.

Sometimes the best ambitions are the ones you can't put on a chart.`
  }
];

async function seed() {
  for (const a of articles) {
    const slug = a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const exists = await prisma.article.findUnique({ where: { slug } });
    if (exists) {
      console.log('Skip:', slug);
      continue;
    }
    const wc = a.content.split(/\s+/).filter(Boolean).length;
    await prisma.article.create({
      data: {
        slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        topic: 'Book Launch',
        published: false,
        featured: false,
        readTime: Math.max(1, Math.ceil(wc / 230)),
      },
    });
    console.log('Created:', slug);
  }
  await prisma.$disconnect();
}

