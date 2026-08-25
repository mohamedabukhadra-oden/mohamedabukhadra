import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const articles = [
  {
    title: 'Why I Stopped Giving Advice',
    topic: 'Contrarian Thinking',
    excerpt:
      "I spent years being the person everyone came to for business advice. Then I noticed something uncomfortable: almost no one ever took it. They didn't want counsel. They wanted permission to do what they'd already decided.",
    content: `A few years ago, a founder I respected called me with what he described as a critical decision. He'd been running his company for seven years and had an offer on the table. The number was good. Not great, but good. He walked me through the financials, the strategic fit, the market timing. He laid it out carefully, like a lawyer presenting evidence.

I listened for forty minutes. Then I told him what I thought. Don't sell. You've built something with real momentum. The offer undervalues your position by at least thirty percent, and more importantly, the market shift coming in eighteen months will change your category entirely. If you hold, you'll be worth significantly more.

He agreed with every point. He said I'd confirmed what his gut was telling him. We hung up, and I felt good about the conversation.

Three weeks later, he sold the company.

This is not an unusual story. I could tell you a dozen like it. The executive who asked me whether to fire a toxic VP, listened to my reasoning, thanked me profusely, and then promoted the VP. The young entrepreneur who asked about pricing strategy, agreed that value-based pricing was the right move, and then launched with the cheapest possible price point. The friend who asked whether to leave his marriage and then renewed the lease for another year the next day.

I used to find these situations frustrating. I'd think, why did you ask if you weren't going to listen? I'd replay the conversation and look for where I'd been unclear. I assumed the problem was my delivery.

It wasn't. The problem was my assumption about what was happening in the first place.

When people ask for advice, they are usually not asking for advice. They are asking for validation of a decision they've already made, or they are testing whether the thing they want to do sounds reasonable when said out loud to someone they respect. Sometimes they just want to talk through the problem and hear themselves think. The asking is the process, not the request.

This took me a long time to accept because I was invested in being useful. I liked being the person people came to. It felt like a form of respect, and I treated it seriously. I'd prepare, think hard, try to give genuine counsel. And none of that was wrong, exactly. But it was misdirected. The effort was real. The audience for it was imaginary.

The shift for me came when I started responding differently. Instead of answering the question, I started asking what they thought they should do. Almost every time, they already had an answer. They'd just never said it out loud, or they didn't trust it, or they needed to hear it reflected back by someone else before it felt real.

There's nothing wrong with that. It's how most people process decisions. But it means that the advice-giver is playing a different role than they think. You're not a consultant. You're a mirror. And mirrors don't give answers. They show people what's already there.

I still get asked for advice. I still give it sometimes, when the situation calls for it and when I sense the person is genuinely open. But I've stopped taking it personally when they don't follow it. I've stopped preparing like it matters. And most importantly, I've stopped pretending that the exchange is about information transfer. It's almost always about something else entirely — confirmation, courage, or just the simple act of being heard by someone whose opinion they value.

The hardest part of stopping wasn't the behaviour change. It was giving up the identity. Being the advice guy is a comfortable place to stand. You get to feel wise without taking any of the risks. You get to be involved in decisions without owning the consequences. It's a clean arrangement, and I miss it sometimes.

But I'm more useful now. Not because I give better advice, but because I stopped giving advice to people who didn't want it and started paying attention to what they actually needed. Most of the time, that's not an answer. It's a question asked back. What do you think you should do? Say it out loud. See how it sounds. If it sounds right, you don't need me. And if it doesn't sound right, you already knew that too. You just weren't ready to sit with it yet.`
  },
  {
    title: 'The Problem With Being the Smartest Person in the Room',
    topic: 'Contrarian Thinking',
    excerpt:
      'In twenty-five years of business, the most consistently ineffective people I have worked with were not the less knowledgeable ones. They were the ones who knew the most and made sure everyone else knew it.',
    content: `Early in my consulting career, I worked with a technology firm that was struggling with a product launch. The CEO had brought us in to fix what he called an execution problem. After two weeks of observation, it became clear that the execution was fine. The problem was him.

He was, by any objective measure, brilliant. PhD in engineering. Two successful exits before this company. He could walk into any room and within minutes understand the technical problem better than anyone else present. He wasn't pretending. He genuinely was the smartest person in most rooms he entered.

And that was the problem.

In every meeting, he would diagnose the issue first. He'd lay out the solution before anyone else had finished framing the question. His solutions were usually right, which made it worse, because it meant there was no obvious reason to disagree with him. The team would nod, take notes, and leave the room with clear direction.

Then they'd go back to their desks and do something slightly different. Not because they disagreed. Because they hadn't actually engaged with the problem. He'd solved it for them, and they'd become passengers in their own work.

Over the course of eighteen months, I watched this pattern play out dozens of times. The CEO would identify a problem, propose a solution, and the team would execute a version of it that lacked the nuance and ownership that comes from having wrestled with the problem yourself. The results were always slightly off. Not terrible. Just not good enough.

The CEO couldn't understand it. He'd say, I gave them the answer. What else do they need? And from his perspective, that was a fair question. He had given them the answer. But answers that are given before the question is fully owned don't stick. They get implemented mechanically, without the adjustments that come from understanding why the answer works and when it might not.

This is a counterintuitive dynamic. You'd think that having the smartest person in the room would be an advantage. And in some ways it is. But in a leadership context, it's often a liability, because the smartest person in the room tends to do the thinking for everyone else. And when one person does the thinking, the rest of the room stops thinking. They defer. They comply. They stop generating alternatives, because the alternatives have already been pre-empted by someone more knowledgeable.

I've seen this in boardrooms, in startup teams, in academic departments, and in government committees. The pattern is the same. The most knowledgeable person speaks first and most authoritatively, and the quality of collective thinking drops proportionally.

The leaders I've seen who get this right are not less knowledgeable. They're more disciplined about when and how they share what they know. They ask questions before they give answers. They let the room sit in uncertainty for a while before filling it. They resist the urge to solve, even when the solution is obvious to them.

This is not about being humble or pretending to be less informed than you are. It's about understanding that your job in a room full of people is not to demonstrate your intelligence. It's to create the conditions for the group's intelligence to operate. Those are different tasks, and being good at one doesn't make you good at the other.

The CEO I worked with eventually learned this, but it cost him. By the time he adjusted, several of his best people had left, not because the company was failing, but because they'd stopped feeling like they mattered. They were competent professionals who'd been reduced to implementation vehicles for someone else's thinking. That's a miserable way to work, and talented people don't tolerate it for long.

If you're consistently the smartest person in your meetings, that's worth examining. Not because intelligence is a problem, but because the behaviours that come with it often are. The impulse to answer before you've heard. The assumption that your understanding is complete. The unconscious signalling that other people's thinking is secondary. Those behaviours don't just diminish the people around you. They diminish the quality of the outcome, because they replace collective intelligence with individual intelligence, and individual intelligence, no matter how impressive, has limits.`
  },
  {
    title: 'Why Consistency Beats Talent (But Nobody Wants to Hear It)',
    topic: 'Contrarian Thinking',
    excerpt:
      'I have watched dozens of talented people coast on ability while less gifted peers outworked, outlasted, and eventually outperformed them. Talent is a starting point, not a strategy.',
    content: `There was a salesperson at one of my earlier companies who was, by any measure, untalented. He wasn't charismatic. His product knowledge was average. He didn't have the natural ease that the best salespeople seem to be born with. In meetings, he was awkward. On calls, he was too direct. He didn't read the room well. Everything about him suggested he was in the wrong profession.

He also outsold everyone on the team for three consecutive years.

I spent a long time trying to understand how. The answer was boring, which is probably why nobody talks about it. He showed up every day and did the work. He made more calls than anyone. He followed up more consistently. He didn't rely on inspiration or flow states or being in the right mood. He had a process, and he followed it whether he felt like it or not.

His colleagues, several of whom were genuinely talented, would have bursts of brilliance followed by periods of inactivity. They'd land a big deal and then coast for a month. They'd get inspired, make thirty calls in two days, and then disappear into admin work and meetings for a week. Their performance was spectacular in short bursts and mediocre over time.

The untalented salesperson's performance was never spectacular. It was just consistently, predictably good. And over twelve months, consistently good beats spectacular-then-mediocre every time.

This is not a new observation. But it's one that most people resist, because it's unsatisfying. We want to believe that talent matters most, because talent feels like destiny. It feels like something you're given, something that sets you apart. Consistency feels like labour. It feels ordinary. Nobody writes books about the person who showed up and did the work. They write books about visionaries and prodigies and overnight successes.

The problem is that the visionaries and prodigies are outliers, and the overnight successes usually weren't. The real story of most business success is much less interesting. It's people doing unglamorous work, day after day, for years, until the accumulation of that work produces results that look remarkable from the outside.

I've seen this pattern in marketing, in product development, in leadership, in almost every domain. The people who win are rarely the most talented. They're the most consistent. They write every day. They ship every week. They follow up every lead. They don't wait for motivation. They don't need to feel inspired. They have a rhythm, and they maintain it.

The reason this truth is unpopular is that it's threatening. If talent is what matters, then your outcomes are mostly determined by something outside your control, which is actually a comfortable thought. It means that if you're not succeeding, it's not your fault. You just weren't given the right gifts. But if consistency is what matters, then your outcomes are largely determined by your behaviour, which is an uncomfortable thought, because it means you're responsible in a way that talent-based thinking doesn't require.

I'm not saying talent doesn't matter. It does. Talent is an accelerator. It makes the early stages faster. It opens doors that consistency alone might not open. But talent without consistency is an engine without fuel. It has potential but no output.

What I've noticed over the years is that the most talented people often struggle the most with consistency. They rely on their ability to produce results in short bursts, and it works for a while. But as the work gets harder and the competition gets tougher, the bursts become less effective and the gaps between them become more costly. Meanwhile, the consistent person keeps accumulating. Each day's work builds on the last. The compounding effect is enormous, but it's invisible in the short term, so nobody notices until the gap becomes obvious.

The untalented salesperson I mentioned eventually became the sales director. Not because he suddenly became talented, but because he'd built something that talent alone couldn't build: a track record of reliable results over time. That track record was more valuable to the business than any amount of natural ability, because reliability is what you can build on. Brilliance is not. Brilliance is wonderful when it shows up. You just can't schedule it.`
  },
  {
    title: 'What Your Competition Gets Wrong',
    topic: 'Contrarian Thinking',
    excerpt:
      'I have sat through hundreds of competitive analyses. Detailed spreadsheets, feature comparisons, pricing matrices. Almost none of it mattered. Here is what I learned instead.',
    content: `Early in my career, I worked at a company that was obsessed with its competitors. Every Monday morning, the executive team would gather for a competitive review. We'd go through every move the competition had made that week. New product features. Pricing changes. Marketing campaigns. Hiring announcements. Partnership deals. It was thorough, detailed, and almost entirely useless.

The problem wasn't the quality of the analysis. The analysts were sharp. The data was solid. The problem was the underlying assumption: that understanding what competitors were doing would help us make better decisions. In practice, it did the opposite. It made us reactive. Every move we considered was filtered through the question, what will the competition think? We'd design products by looking at what they had and deciding whether to match, exceed, or differentiate. We'd set prices by benchmarking against theirs. We'd plan campaigns as responses to theirs.

We were playing their game. And when you play someone else's game, the best you can do is win their game. You can't win your own, because you've stopped playing it.

This is the fundamental error of competitive analysis. It directs your attention outward when it should be directed inward. The question that matters is not what are they doing. The question is what do our customers need that nobody is providing well, including us? That question can't be answered by studying competitors. It can only be answered by studying customers and by being honest about your own capabilities and limitations.

I learned this lesson properly when I was running a business in the Middle East. We had a competitor who was larger, better funded, and more established. They were doing everything right by conventional standards. Great marketing. Strong distribution. Good product. We couldn't outspend them, and we couldn't out-feature them. So we stopped trying.

Instead of asking how we could beat them, we asked a different question: what problem do our customers have that nobody is solving? The answer was surprisingly specific. Our customers didn't just want the product. They wanted someone who understood their local market well enough to help them use the product effectively. The large competitor was selling products. We started selling outcomes. We embedded ourselves in our customers' operations. We learned their businesses. We made their success our responsibility.

We didn't beat the competitor by studying them. We beat them by ignoring them and focusing entirely on the customer. By the time they figured out what we were doing, we'd built relationships that were difficult to displace.

I'm not saying you should be ignorant of your competitive landscape. That's reckless. You need to know what's happening in your market. But there's a difference between awareness and obsession. Awareness informs. Obsession directs. And when it directs, it directs you toward imitation and reaction rather than toward originality and initiative.

The companies I've seen succeed most consistently are the ones that spend less time on competitors and more time on customers. They don't ignore the market. They just don't let it drive their strategy. Their strategy comes from a clear understanding of who they serve and what value they provide. Everything else is secondary.

The other problem with competitive focus is that it leads to a particular kind of mediocrity. When everyone in an industry studies everyone else, the products converge. Features become standardized. Pricing becomes similar. Marketing starts to sound the same. You end up with a market full of companies that look like slightly different versions of each other, none of them particularly compelling, all of them competing on the same narrow dimensions.

The way out of that trap is not to study harder. It's to look somewhere else entirely. Look at your customers. Look at adjacent industries. Look at problems that nobody in your category is addressing. The best strategic insights don't come from competitive analysis. They come from fresh observation of a problem that everyone else has stopped noticing because they're too busy watching each other.

If I could give one piece of advice to a new business leader, it would be this: spend eighty percent of your strategic attention on your customers and your own capabilities. Spend twenty percent on the competitive landscape. Any more than that, and you're not leading. You're following.`
  },
  {
    title: "Why I Don't Believe in Work-Life Balance",
    topic: 'Contrarian Thinking',
    excerpt:
      "The problem with work-life balance isn't that it's hard to achieve. It's that it's the wrong frame entirely. It assumes work and life are separate things that compete for your time. They're not.",
    content: `A colleague once told me she'd achieved work-life balance. She'd reduced her hours, set boundaries, stopped checking email after seven. She looked exhausted. Not the exhaustion of overwork. The exhaustion of constant negotiation. She was spending a significant portion of her mental energy maintaining the boundary between her work and her life, and that maintenance was itself a form of work.

This is what the balance frame does to people. It turns life into a resource allocation problem. How many hours for work. How many for family. How many for yourself. The implicit assumption is that these are competing demands on a fixed resource, and the goal is to distribute that resource fairly. It sounds reasonable. In practice, it's a trap.

The trap is that balance implies a zero-sum relationship between work and life. More of one means less of the other. This framing forces you to think of work as something you do at the expense of life, and life as something that happens when you're not working. Neither of those is true for most people I know who are doing meaningful work.

I've run businesses, taught at universities, and advised companies across multiple countries. At no point in that career did I experience work and life as separate domains. The relationships I built at work became personal relationships. The skills I developed professionally made me better in my personal life. The problems I encountered at work shaped how I thought about the world. Work was not something I did instead of living. It was part of how I lived.

There were certainly periods when work consumed too much. Periods when I neglected my health, my family, or things I cared about. But the solution wasn't better balance. It was better priorities. I didn't need to allocate my time more evenly. I needed to be clearer about what mattered and make sure I was actually doing those things, whether they fell in the work column or the life column.

The balance metaphor also carries a moral undertone that I find unhelpful. It suggests that working long hours is inherently bad and that limiting work is inherently good. Sometimes that's true. Sometimes it's not. There have been phases in my career when working intensely was exactly the right thing to do. The projects mattered. The impact was real. I don't regret those periods, and I don't think I was doing something wrong by not balancing them with equal measures of leisure.

Conversely, there have been periods when stepping back was the right call. When my children were young. When I needed to recover from burnout. When the work in front of me wasn't worth the intensity. In those moments, reducing work wasn't about balance. It was about appropriateness. The situation demanded a different response.

What I've come to believe is that the right frame is not balance but alignment. Are the things you're spending your time on consistent with what you actually care about? Not what you think you should care about. What you genuinely, when you're honest with yourself, care about.

For some people, the answer will include a lot of work. For others, it won't. Neither is wrong. The mistake is imposing a single template on everyone and calling it balance. The person who works sixty hours a week and loves it is not unbalanced. The person who works thirty hours and feels guilty about not doing more is also not unbalanced, though they might be unhappy for other reasons.

The balance industry — and it is an industry — sells a solution to a problem it misdiagnoses. The problem isn't that people work too much or live too little. The problem is that people are unclear about what they want and spend their time on things that don't connect to anything meaningful. A perfectly balanced schedule full of meaningless activity is not an improvement over an imbalanced schedule full of purpose.

What I'd suggest instead of chasing balance is something simpler and harder. Know what matters to you. Do more of that. Do less of what doesn't. Accept that some weeks will be heavy on work and some won't. Stop counting hours and start counting whether today was worth living. That's not a framework. It's just honesty. But it works better than any balance wheel I've ever seen.`
  },
  {
    title: 'The Truth About Networking That No One Says Out Loud',
    topic: 'Contrarian Thinking',
    excerpt:
      'Most of what people call networking is a performance. Business cards exchanged, LinkedIn connections made, follow-up emails sent and forgotten. Here is what actually moves the needle, and why almost nobody does it.',
    content: `I have attended more networking events than I can count. Conferences, industry dinners, roundtables, meetups, breakfasts, lunches, and the odd cocktail reception where everyone stands around holding a drink they don't want, pretending to enjoy conversations they'll forget by morning.

At these events, the same script plays out. People introduce themselves, describe what they do, exchange pleasantries, and promise to stay in touch. They don't. Maybe one in fifty of these interactions produces anything meaningful. The rest are social noise — pleasant enough in the moment, completely inert afterward.

This is not a controversial observation. Most people know that networking events are largely ineffective. They go anyway, because the alternative — not going — feels like missing out. What if someone important is there? What if I meet my next partner, client, or investor? The possibility, however remote, keeps people showing up.

But here's the thing. The people I know who have the strongest professional networks did not build them at networking events. They built them by being genuinely useful to specific people over a long period of time. That's it. That's the secret. It's so unremarkable that it hardly qualifies as insight, which is probably why it's so rarely said out loud.

Let me give you a concrete example. Early in my career, I met a person at a conference. Unlike most conference interactions, this one stuck, but not because of anything that happened at the event. It stuck because over the next two years, I did something simple. When I saw an article or a piece of information that was relevant to his work, I sent it to him. No agenda. No ask. Just a short note saying, saw this, thought of you.

I did this maybe ten times over two years. Not systematically. Just when something genuinely relevant crossed my path. At some point, he started doing the same for me. The relationship developed naturally, without any of the forced intensity that networking advice typically recommends. No coffee meetings scheduled for the sole purpose of relationship maintenance. No quarterly check-ins. Just a low-grade, consistent signal that I was paying attention to his world.

That relationship eventually led to one of the most important professional opportunities of my career. Not because he owed me. He didn't. But because when an opportunity arose where he needed someone he trusted, I was the person who came to mind. Trust had been built, not through strategic networking, but through accumulated small acts of usefulness.

This approach is uncomfortable for most people because it's slow and it doesn't feel productive. Networking events feel productive. You come home with a stack of business cards and a sense of accomplishment. Sending someone an article with no ask doesn't feel productive. It feels like a waste of time. There's no immediate return, no tangible output, nothing you can put in a report.

But that's precisely why it works. Most people won't do it. They'll opt for the event, the coffee meeting, the LinkedIn connection, because those feel like action. The slow, invisible work of being useful without expectation of return feels like inaction, and people are deeply uncomfortable with inaction, even when the inaction is more effective than the action.

The other truth about networking that nobody says is that most of your network is already built. The people who can help you most are probably already in your life. Former colleagues. University classmates. People you've worked with on projects or encountered through mutual connections. The gap isn't in meeting new people. It's in deepening existing relationships. But deepening relationships requires vulnerability and generosity, and those are harder than handing out business cards.

I stopped going to networking events years ago. Not because I think they're evil. They're fine. They're just a poor return on time. Instead, I pick a small number of people and invest in those relationships consistently. I send them things. I make introductions when I can. I offer help without being asked. I don't keep score. And when I need something, I ask, because the relationship can bear it.

That's the whole strategy. It's not a strategy at all. It's just treating people well over time. But in a world obsessed with networking hacks and relationship frameworks, even basic decency has become a competitive advantage.`
  },
  {
    title: 'Why Most Business Books Are Useless',
    topic: 'Contrarian Thinking',
    excerpt:
      "I'm writing a book, which makes this admission awkward. But most business books sell frameworks that only work in hindsight. Here's why I'm trying to write a different kind.",
    content: `I'm writing a book. Which means what I'm about to say comes with a particular kind of irony that I'm aware of and comfortable with. Most business books are useless. Not all of them. But most.

The problem isn't the writing. Many business books are well-written. The problem isn't even the ideas. Some of them contain genuinely interesting thinking. The problem is what happens between the idea and the reader's attempt to apply it.

A business book typically presents a framework. The framework organizes a set of observations into a model that explains why some companies succeed and others fail. The model is usually developed by looking backwards at historical examples. Company A did X and succeeded. Company B did Y and failed. Therefore, X is better than Y.

This kind of reasoning feels convincing when you read it. The examples are vivid. The logic is clean. The framework has a memorable name and a tidy diagram. You close the book thinking you understand something important about business.

Then you try to apply it, and it falls apart. Not because the framework is wrong, exactly, but because frameworks are descriptions of the past, and you're operating in the present. The conditions that made X work for Company A were specific to Company A. Their market, their team, their timing, their resources, their competitors, their luck. None of those conditions are replicable, so the framework, while accurately describing what happened, can't reliably predict what will happen.

I've read hundreds of business books. The ones that were actually useful to me were not the ones with frameworks. They were the ones that changed how I saw a situation. They didn't give me a model to apply. They gave me a lens to look through. The distinction is important. A model tells you what to do. A lens changes what you notice. Models break when conditions change. Lenses don't, because they're not about conditions. They're about perception.

The business book industry has a structural incentive to produce models rather than lenses. Models are marketable. You can put them on a slide. You can teach them in a workshop. You can build a consulting practice around them. Lenses are harder to sell because they don't come with instructions. They come with a shift in perspective that the reader has to integrate on their own, and that integration can't be standardized.

I've also noticed that the most useful business thinking I've encountered didn't come from business books at all. It came from conversations with practitioners. From watching what actually worked and what didn't in real situations with real constraints. From making mistakes and having someone more experienced point out what I'd missed. That kind of learning is messy, context-dependent, and impossible to package in a book with a catchy title.

The books that have aged best for me are the ones that admitted uncertainty. The authors who acknowledged that their frameworks had limits, that the examples were selected to support the argument, and that the real world is more complex than any model can capture. Those books didn't promise answers. They offered thinking tools, and they trusted the reader to figure out how to use them.

Most business books, though, promise answers. And the market rewards them for it. Readers want certainty. They want to feel like they're learning something actionable. A book that says, here's an interesting way to think about this problem, but it might not work in your situation, and you'll need to adapt it significantly, and honestly the outcome depends on things nobody can control — that book doesn't sell well.

So the industry produces books that sell well, which means books that offer certainty, which means books that present frameworks as though they were laws. And readers buy them, feel inspired, try to apply the frameworks, find that the results don't match the promises, and conclude either that they implemented it wrong or that the book was wrong. Usually, neither is true. The book described something that worked in a specific context. The reader is in a different context. The gap isn't a failure. It's just reality.

I'm trying to write a different kind of book. I don't know if I'll succeed. The pressure to produce a clean framework is real. Publishers want it. Readers expect it. But I'd rather be honest than marketable. The truth is that most of what I've learned in twenty-five years of business can't be reduced to a model. It's situational, partial, and full of contradictions. Writing that down honestly is harder than writing a framework. But it might actually be useful.`
  },
  {
    title: 'The Award That Made Me Uncomfortable',
    topic: 'Contrarian Thinking',
    excerpt:
      'I won an award once that was supposed to feel like a career milestone. Instead, it felt like a mirror showing me that I was being measured for something that didn\'t matter.',
    content: `A few years ago, I received an industry award for marketing excellence. The ceremony was in a hotel ballroom. Four hundred people, formal dress, a dinner that cost more per head than most families spend on groceries in a week. I sat at a table near the front, which I was told was an honour, and waited for my name to be called.

When it was called, I walked to the stage, accepted the glass trophy, shook hands with the presenter, and smiled for the photograph. The audience applauded. My colleagues cheered. My family, who'd flown in for the occasion, looked proud. By every external measure, it was a good night.

I drove home feeling unsettled, and it took me several days to understand why.

The award was for a campaign I'd overseen. It was a good campaign. Well-executed, strong results, clear impact on the business. But the criteria for the award weren't about results. They were about creativity, innovation, and storytelling. The campaign had all of those things. But the results it produced were partly due to factors that had nothing to do with creativity or innovation. We'd had a favorable market. A competitor had stumbled. The timing had been lucky.

None of that was mentioned in the award citation. The citation described the campaign as though it had succeeded because of the team's brilliance. It attributed the outcome entirely to skill and strategy. The role of luck, timing, and external factors was erased entirely. And standing on that stage, I'd participated in that erasure by accepting the award without qualification.

This is what awards do. They isolate a narrative from its context. They tell a clean story about cause and effect: this team did great work, and therefore this result happened. The story is satisfying, which is why awards ceremonies are popular. But it's incomplete, and in some cases, it's misleading.

The uncomfortable truth is that the best work I've done in my career didn't win awards, and some of the award-winning work wasn't my best. The awards rewarded visibility and narrative, not impact. They rewarded campaigns that could be told as stories, not campaigns that quietly produced results over long periods. They rewarded the kind of work that looks good in a presentation, not the kind of work that builds durable value.

I'm not bitter about the award. I appreciate the recognition. But the experience made me think differently about what we choose to celebrate and why. In business, we tend to celebrate outcomes without examining causes. We assume that good results come from good decisions and bad results come from bad decisions. The reality is more complicated. Good decisions can produce bad results, and bad decisions can produce good results. Awards don't capture that complexity. They simplify it, and the simplification serves the institution giving the award more than it serves the person receiving it.

What made me most uncomfortable was the effect the award had on others. After I won, people treated me differently. They assumed I'd figured something out. They asked me to speak at events, to share my secrets, to explain how I'd done it. The expectation was that I had a repeatable formula, and the more I insisted that I didn't, the more people assumed I was being modest. I wasn't being modest. I was being honest.

The award also affected me. I found myself, in the months that followed, making decisions with the award in mind. Not consciously. But there was a subtle pressure to do work that was award-worthy, which meant work that was visible, novel, and narratively satisfying. That's not the same as work that is effective. The two overlap sometimes, but not always, and when they don't, chasing the award-worthy version can lead you away from the effective version.

I still have the glass trophy. It sits on a shelf in my office. I don't look at it often, but when I do, it reminds me of something important: the things that get celebrated are not always the things that matter. And the more you let external validation shape your definition of good work, the further you get from work that is actually good.`
  },
  {
    title: 'Why Experience Can Be a Trap',
    topic: 'Contrarian Thinking',
    excerpt:
      'I made one of the worst decisions of my career because I knew too much. My experience didn\'t help me see clearly. It prevented me from seeing what was right in front of me.',
    content: `In 2015, I was advising a startup that had developed a product for the Middle Eastern market. The founders were young, technically sharp, and genuinely excited about what they'd built. They wanted my help with go-to-market strategy. I sat down, reviewed the product, looked at the market data, and told them exactly what I thought they should do.

My advice was wrong. Not slightly wrong. Fundamentally wrong. And the reason it was wrong was that I was applying a mental model from 2008 to a market that had changed beyond recognition.

Here's what happened. I'd successfully launched similar products in the region years earlier. I knew the distribution channels, the pricing dynamics, the regulatory landscape, and the cultural nuances. I had deep experience, and I was confident in my judgment. I laid out a plan that was logical, detailed, and based on everything I'd learned over a decade of working in that market.

The founders listened politely. One of them, a young woman who'd grown up in Riyadh and Dubai, asked a question that I dismissed at the time but think about often now. She said, do you think the market has changed since you were last doing this? I said the fundamentals were the same. I was wrong about that too.

The market had changed dramatically. Consumer behaviour had shifted. The channels that used to work were declining. New channels had emerged that I didn't fully understand because I hadn't been a consumer in those channels. The pricing models that had been effective were now outdated because a new competitor had changed customer expectations. The regulatory environment had shifted in ways that created both new constraints and new opportunities that my old mental model didn't account for.

I didn't see any of this because I was seeing the market through the lens of my experience, and experience, when it's deep enough, doesn't just inform your perception. It shapes it. It filters out information that doesn't fit the existing pattern. I literally couldn't see what was in front of me because my brain was so committed to the pattern it had already established.

This is the trap of experience. It's not that experience is useless. It's that at a certain point, experience stops being an asset and starts being a filter. The filter is efficient. It allows you to make fast decisions based on pattern recognition. But it also blocks new information, especially information that contradicts the established pattern. And in rapidly changing environments, the blocked information is often the most important information.

The founders eventually went with a strategy that was closer to their original instinct than to my advice. It was riskier than what I'd proposed. It was less polished. It involved channels and approaches that I wasn't familiar with and that my experience told me were unreliable. It worked. Not because they were smarter than me. They weren't. It worked because they didn't have the filter I had. They saw the market as it was, not as it had been.

This experience — the experience of being wrong because I knew too much — changed how I think about expertise. I used to believe that the more experience you had, the better your judgment. I now believe that experience improves judgment up to a point, and then it plateaus, and then it can actually degrade judgment if the person isn't actively working against the filtering effect.

Working against it is hard. It means deliberately seeking out information that contradicts your assumptions. It means taking seriously the perspectives of people who don't share your background. It means regularly asking the question that young founder asked me: has the market changed since I last looked? And being willing to accept that the answer might be yes, even if everything in your experience says otherwise.

The people I've met who maintain good judgment over long careers are not the ones who rely on experience. They're the ones who use experience as one input among many, and who treat their own expertise with a certain suspicion. They know what they know, and they're aware that what they know might be wrong. That awareness is uncomfortable. It undermines confidence. But it's the only reliable defense against the trap.`
  },
  {
    title: 'The Mentor I Never Had',
    topic: 'Contrarian Thinking',
    excerpt:
      'The mentorship industry will tell you that you need a mentor. I spent years looking for one. What I actually needed was a specific set of failures that no mentor could have arranged for me.',
    content: `When I was in my twenties, I was obsessed with finding a mentor. Not just any mentor. The right mentor. Someone experienced, successful, willing to invest time in my development. I read books about mentorship. I attended events where successful people spoke. I reached out to senior professionals and asked if they'd be willing to mentor me. Most said yes politely and then never followed up. A few had a coffee or two and then drifted away. One tried, genuinely, but the relationship felt forced and awkward, and it dissolved within a few months.

I interpreted this as a personal failing. I thought there was something wrong with my approach, or worse, something wrong with me. Maybe I wasn't mentorable. Maybe I wasn't impressive enough to warrant someone's investment. I kept trying, and I kept being disappointed, and the disappointment accumulated into a quiet resentment toward the whole concept.

Years later, looking back, I can see what was actually happening. The mentorship model I was pursuing was based on a flawed premise. It assumed that development is primarily a knowledge transfer problem — that someone who's been where you want to go can tell you how to get there. And sometimes that's true. Sometimes a mentor can save you years by pointing out a mistake you're about to make or opening a door you didn't know existed.

But most of what I needed to learn couldn't be transferred. It had to be experienced. The feeling of making a bad hire and having to let someone go. The weight of a decision that affects dozens of families. The specific kind of loneliness that comes from being responsible for something that might fail. No mentor could teach me those things by describing them. I had to live them.

What actually developed me was a series of failures, each one teaching me something specific that no conversation could have taught. I launched a product that failed because I didn't understand the market well enough. That failure taught me humility and the value of deep customer research. I made a hiring decision based on credentials rather than character, and it cost me a year of productivity and a significant amount of money. That failure taught me what actually matters in people. I held onto a strategy too long because admitting it wasn't working felt like admitting I was wrong. That failure taught me the difference between persistence and stubbornness, a distinction I now think about constantly.

Each of these failures was painful. Genuinely painful. Not in a poetic, motivational-poster way. In a sleepless-night, stomach-knotting, relationship-straining way. But the learning was real and durable, in a way that mentor advice rarely is. When someone tells you something, you can understand it intellectually without internalizing it. When you fail at something, the learning goes deeper. It becomes part of how you operate, not just part of what you know.

I'm not saying mentors are worthless. Some people have had transformative mentoring relationships, and I don't doubt their value. What I'm saying is that the mentorship industry oversells the concept. It presents mentorship as essential, as though without it you're somehow disadvantaged. That's not true. Many of the most capable people I know never had a formal mentor. They learned through doing, through failing, through observing carefully and reflecting honestly.

What I had instead of a mentor was a small group of peers. People at a similar stage of their careers who were wrestling with similar problems. We didn't have the answers, but we had the questions, and we shared them honestly. Those peer relationships were more valuable to me than any mentorship could have been, because they were reciprocal. We were all learning. No one was playing the wise elder. We were just people trying to figure things out, and the shared struggle was its own form of education.

If you're looking for a mentor, by all means, find one. But don't make it the central strategy of your development. The central strategy should be doing hard things, failing at some of them, and being honest about what those failures taught you. That's slower than having a mentor hand you answers. It's messier. It's more painful. But the learning is yours. You earned it. And that makes it stick in a way that borrowed wisdom never does.`
  },
  {
    title: 'Why Good People Make Bad Decisions',
    topic: 'Contrarian Thinking',
    excerpt:
      'This is not about ethics. It is about something more subtle: how being a decent, well-intentioned person can actually lead you to decisions that hurt your business and the people in it.',
    content: `I fired someone once who didn't deserve to be fired. Not because he was bad at his job. He was good. Not because he'd done something wrong. He hadn't. I fired him because I was trying to be fair to someone else, and in trying to be fair, I made a decision that was unfair to everyone, including the person I was trying to help.

Here's the situation. I had two people on my team who were competing for a promotion. One of them, let's call him Samir, was performing well but had hit a plateau. The other, let's call her Dina, was newer to the team but was growing rapidly and had recently delivered a project that exceeded expectations. The promotion could only go to one of them.

Dina was the obvious choice by any objective measure. But Samir had been on the team longer. He'd been loyal. He'd contributed during a difficult period when the team was understaffed. Giving the promotion to Dina felt, to me, like a betrayal of that loyalty. It felt like I was saying that years of steady contribution counted for nothing.

So I did something that I thought was compassionate. I promoted both of them. I created a new role for Samir so that he wouldn't feel passed over. The intention was good. The result was a disaster. The new role had no clear scope, and Samir floundered in it. He went from being a competent, confident contributor to being confused and demoralized. Dina, meanwhile, felt that her achievement had been diluted. She'd earned the promotion on merit, and now she was sharing the spotlight with someone who hadn't. The team was confused about reporting lines. The culture shifted from performance-based to politics-aware.

Within six months, Samir left. Not because he was pushed out, but because the situation I'd created had made him unhappy in a way that his original role never had. Dina stayed, but her relationship with me was never quite the same. She'd seen me make a decision based on sentiment rather than judgment, and it affected her trust in my leadership.

I made that decision because I am, by nature, someone who values fairness and loyalty. Those are good traits. But in that moment, they led me to a bad decision, because I was applying them to the wrong frame. I was thinking about what felt fair to Samir. I should have been thinking about what was right for the team, the business, and, as it turned out, for Samir himself.

This is a pattern I've seen repeatedly in business. Good people, well-intentioned leaders, making decisions that hurt the very people and causes they're trying to serve. They avoid hard conversations because they don't want to hurt feelings, and the avoidance creates larger problems. They give second chances to people who've demonstrated they don't deserve them, and the second chance damages the team's trust in the leader's judgment. They distribute rewards equally rather than based on contribution, and the distribution sends a signal that effort doesn't matter.

The common thread is that good intentions override good judgment. The person making the decision is so focused on being kind or fair or loyal that they lose sight of the actual consequences. They mean well, and the meaning well becomes the decision criteria, replacing effectiveness, clarity, and sometimes even honesty.

I'm not suggesting that leaders should be cold or ruthless. I'm suggesting that kindness and effectiveness are not the same thing, and that conflating them is a common and costly error. Sometimes the kind thing to do and the right thing to do are different. Being honest with someone about their performance is kinder in the long run than protecting their feelings in the short run. Making a clear, merit-based decision is fairer to everyone than a decision designed to avoid hurting one person's feelings.

The hardest lesson for me was accepting that my desire to be a good person — to be fair, to be kind, to be loyal — was not the same as being a good leader. Those things overlap significantly, but they are not identical. And in the moments where they diverge, I have to choose. I've learned, the hard way, that choosing the appearance of goodness over the reality of effectiveness doesn't make me good. It makes me well-intentioned and ineffective, which is a combination that helps no one.`
  },
  {
    title: 'The Problem With Passion',
    topic: 'Contrarian Thinking',
    excerpt:
      "'Follow your passion' is not just bad advice. For some people, it's actively harmful. I've seen it lead people into bad careers, bad businesses, and bad decisions. Here's what I'd say instead.",
    content: `A former student of mine came to see me a few years after graduation. She'd been working in marketing at a tech company and was unhappy. Not the normal kind of unhappy that everyone feels at work sometimes. A deep, persistent unhappiness that was affecting her health and her relationships.

She told me she'd taken the marketing job because she was passionate about marketing. She'd studied it at university. She'd interned at agencies. She'd built a portfolio. She'd done everything right by the follow-your-passion playbook. And now, three years in, she was miserable.

I asked her what she actually enjoyed about marketing. She thought about it for a long time and said, honestly, I don't think I enjoy any of it. I thought I did. I was good at it in school. But the actual day-to-day work of marketing in a corporate environment is nothing like what I imagined.

This is the problem with passion as a career strategy. Passion, as most people experience it, is a feeling. And feelings are unreliable guides for long-term decisions. The passion you feel for a subject in school or in a hobby is not the same as the experience of doing that thing professionally, eight hours a day, with deadlines, stakeholders, office politics, and the constant pressure to produce results. The feeling and the reality are different things, and following the feeling into the reality is how people end up in careers they hate.

I've seen this pattern repeatedly. The person who's passionate about cooking becomes a chef and discovers that commercial kitchens are high-stress, low-margin environments where creativity takes a back seat to consistency and speed. The person who's passionate about music becomes a professional musician and finds that the business of music is mostly about marketing, touring, and negotiating contracts, not about making art. The person who's passionate about technology starts a company and realizes that running a business is mostly about managing people, raising money, and dealing with regulatory compliance.

In each case, the passion was real. But it was passion for an idealized version of the activity, not for the reality of doing it professionally. And the follow-your-passion advice doesn't distinguish between the two. It assumes that passion for the idea translates into satisfaction with the execution. Often, it doesn't.

What I've found works better is a different question entirely. Instead of asking what am I passionate about, ask what kind of problems do I enjoy solving? This question is more practical because it focuses on the actual work, not the identity. You might be passionate about design, but what you actually enjoy is the problem-solving process of making something work within constraints. That problem-solving process exists in many fields, not just design. Identifying the process you enjoy gives you more options and a more accurate picture of where you'll be satisfied.

Another question that works better: what kind of environment allows me to do my best work? Some people thrive in structured environments. Others need freedom. Some like collaboration. Others need solitude. Matching your work environment to your temperament is often more important than matching your job title to your passion.

I'd also ask: what am I willing to be bad at? This sounds strange, but it's important. Every career involves things you're not good at and don't enjoy. The marketing professional who's passionate about strategy but hates analytics is going to struggle, because modern marketing requires analytics. The entrepreneur who's passionate about product but hates sales is going to struggle, because every business needs revenue. Knowing what you're willing to tolerate — what you'll endure for the parts you enjoy — is more useful than knowing what you're passionate about.

What I tell young people now, when they ask about career direction, is simple. Don't follow your passion. Follow your curiosity. Be interested in many things. Try things. Pay attention to what holds your attention over time, not what excites you in the moment. Develop skills that are useful. Build a reputation for reliability. And trust that satisfaction comes from competence, contribution, and connection, not from aligning your job with a feeling that may or may not last.

Passion is a wonderful thing. It makes life richer. But as a career planning tool, it's overrated. The people I know who are most satisfied with their work didn't find it by following their passion. They found it by being useful, by getting good at something, and by gradually discovering that the work they were doing mattered to them in a way they hadn't anticipated.`
  },
  {
    title: 'Why I Question Everything I Was Taught at Business School',
    topic: 'Contrarian Thinking',
    excerpt:
      "I have an MBA. I've taught at business schools. And I can tell you with confidence that some of the most fundamental things taught in MBA programs are wrong. Not outdated. Wrong.",
    content: `One of the first things I learned in business school was the SWOT analysis. Strengths, Weaknesses, Opportunities, Threats. A neat four-box framework for analyzing a company's position. I used it in case studies. I used it in my first consulting assignments. It felt professional and thorough.

Then I used it in a real business situation and watched it produce nothing useful. Not because the framework was poorly applied. Because the framework itself encourages a particular kind of thinking that is ill-suited to real business decisions. It encourages you to list factors in four categories and then stare at the list, as if the act of categorizing is the same as the act of deciding. It's not. It's organisational theatre. It looks like analysis but it rarely produces insight.

That was the first crack. There were many more.

I was taught that markets are efficient. That prices reflect all available information. That rational actors make rational decisions. Then I spent twenty-five years in actual markets and discovered that none of these things are true. Markets are frequently irrational. Prices are shaped by sentiment, momentum, and narrative as much as by information. And the actors in these markets are not rational. They're emotional, biased, and constrained by factors that economic models don't account for.

I was taught Porter's Five Forces as the definitive framework for competitive strategy. It's a useful lens, I'll grant that. But it's presented in business school as though it describes reality, when in fact it describes a particular way of thinking about reality. The five forces framework assumes that industries are stable enough to be analyzed statically. In many of the markets I've worked in, especially in the Middle East and Africa, industries are anything but stable. They're shaped by regulatory changes, technological disruption, political shifts, and cultural dynamics that Porter's framework doesn't capture well. Using it exclusively is like trying to navigate a rapidly changing landscape with a map that was accurate twenty years ago.

I was taught that the primary responsibility of a corporation is to maximize shareholder value. This idea, which underpins so much of modern business education, has done enormous damage. Not because shareholder value doesn't matter. It does. But because treating it as the primary responsibility creates a narrow, short-term orientation that damages everything else — employees, customers, communities, and, ironically, long-term shareholder value itself. The companies I've seen that performed best over time were the ones that understood that shareholder value is a byproduct of doing other things well, not a target to be aimed at directly.

I was taught about leadership as though it were a set of traits that could be identified and developed. Visionary. Decisive. Charismatic. Then I met actual leaders and discovered that the most effective ones didn't fit the template at all. Some were introverted. Some were uncertain. Some changed their minds frequently. What made them effective wasn't a set of traits. It was a set of behaviours that were context-dependent and often counterintuitive.

I'm not saying business school is worthless. It taught me to think in structured ways. It gave me a vocabulary for discussing business problems. It exposed me to case studies that broadened my perspective. And the network I built there has been valuable throughout my career.

But the specific content — the frameworks, the models, the theories — I treat with much more skepticism now than I did when I graduated. Not because I think I know better. Because I've seen too many situations where the textbook answer was wrong. Where the model didn't fit. Where the theory explained the past but couldn't predict the future.

What I wasn't taught in business school, and what I think matters most, is judgment. Judgment is the ability to make good decisions in situations where the data is incomplete, the models don't apply, and the right answer isn't obvious. You can't teach judgment in a classroom. You develop it through experience, through reflection, and through the willingness to be wrong and learn from it.

If I were designing a business curriculum today, I'd keep the analytical tools but I'd reframe them. I'd teach every framework with its limitations clearly stated. I'd require students to analyze cases where the conventional approach failed. I'd spend less time on models and more time on the messy, ambiguous reality that models are designed to simplify. And I'd make failure a formal part of the curriculum, because the students who learn to fail well will be the ones who lead well.`
  },
  {
    title: 'The Hidden Cost of Being Agreeable',
    topic: 'Contrarian Thinking',
    excerpt:
      'I have spent most of my career being likeable. It was an asset. It was also a liability that cost me more than I realized until I started paying attention to the price.',
    content: `Early in my career, I was known as someone who was easy to work with. Collaborative. Supportive. Willing to compromise. These are not bad qualities. In many situations, they're essential. But over time, I noticed something. The people who advanced fastest in their careers were not the most agreeable ones. They were the ones who were willing to be disagreeable when it mattered.

I don't mean disagreeable in the sense of being difficult for the sake of it. I mean willing to say no. Willing to push back on a bad idea even when it came from someone more senior. Willing to hold a position that was unpopular in the room. Willing to have the uncomfortable conversation instead of the comfortable one.

I was not good at those things. I wanted people to like me. I wanted the meeting to end well. I wanted to maintain relationships, and I'd learned, correctly, that relationships are important in business. What I hadn't learned is that there's a difference between maintaining relationships through mutual respect and maintaining relationships through accommodation. The first is sustainable. The second erodes your credibility over time.

A specific example. I was in a meeting where a senior executive proposed a strategy that I knew, from direct experience, would not work. I'd seen a similar approach fail at a previous company. The data was clear in my mind. But the executive was enthusiastic. The rest of the team was nodding. The momentum was toward agreement, and going against that momentum felt socially costly.

I said, that's an interesting approach, and I think we should consider some of the risks. I softened it. I framed it as a minor concern rather than a fundamental objection. I was agreeable. The strategy went forward, and six months later, it failed in exactly the way I'd predicted. In the post-mortem, someone asked why no one had raised concerns earlier. I had. But I'd raised them so softly that they were easy to dismiss.

That moment taught me something I should have learned earlier. Being agreeable in the moment felt safe. But the cost showed up later, and it was higher than the cost of being disagreeable would have been. If I'd stated my objection clearly and directly, the meeting would have been uncomfortable. The executive might have been annoyed with me. But the strategy might have been revised, and the six-month failure might have been avoided.

I've seen this pattern play out in many contexts. The manager who doesn't give honest feedback because it might hurt the employee's feelings, and then the employee's performance deteriorates further because they don't know they're off track. The leader who doesn't challenge a dominant team member because they don't want conflict, and the team's thinking becomes one-dimensional. The executive who approves a budget they know is unrealistic because pushing back would be awkward, and then spends the year managing the consequences of that unrealistic budget.

In each case, the agreeable choice in the moment creates a larger problem later. And the person who made the agreeable choice is the one who has to deal with the larger problem. The irony is that by trying to avoid discomfort, they create more of it.

The thing about being agreeable is that it works. It works well. People like agreeable people. They promote them. They invite them to meetings. They include them in things. Being agreeable opens doors. But what I've found is that it opens the wrong doors, or rather, it opens doors to rooms where you're valued for your pleasantness rather than your judgment. And once you're in those rooms, it's very hard to switch from agreeable to disagreeable without people being confused or offended.

What I've tried to develop is not disagreeableness as a default. That's just as limiting. What I've tried to develop is the ability to choose. To be agreeable when it serves the situation and disagreeable when it serves the situation. To read the room and ask, what does this moment require? Not what feels comfortable. What is actually needed.

That's harder than it sounds, because the pressure to be agreeable is constant. It comes from social norms, from power dynamics, from the simple human desire to be liked. Resisting that pressure requires a kind of internal clarity about what you believe and what you're willing to stake your reputation on. I didn't have that clarity early in my career. I was too focused on being liked to think about being right. I've corrected that over time, but I still have to work at it. Being disagreeable when it matters doesn't get easier. You just get better at recognizing when it matters.`
  },
  {
    title: 'What I Got Wrong About Leadership',
    topic: 'Contrarian Thinking',
    excerpt:
      'For the first decade of my leadership career, I believed things about leadership that were not just wrong but actively made me worse at my job. Here is what I believed, what it cost me, and what I replaced it with.',
    content: `I used to believe that leadership was about having answers. When I became a manager for the first time, I thought my job was to be the smartest person in the room, to have a clear vision, and to direct the team toward that vision with confidence and clarity. I prepared extensively for every meeting. I had opinions on everything. I made decisions quickly and communicated them firmly.

My team executed well. We hit our targets. By most external measures, I was a successful leader. But internally, something was off. My team was competent but not creative. They did what I asked but rarely went beyond it. When I was out of the office, things slowed down. Not because they couldn't function without me, but because they'd learned that the person with the answers was me, and in my absence, they defaulted to waiting.

This was my first leadership failure, and I didn't recognize it as a failure because the results were fine. The results were fine because I was working at a company and in a market where competence alone could produce good outcomes. The ceiling on what we could achieve, however, was set by my capabilities, not by the team's. And my capabilities, no matter how strong, had limits.

The second thing I got wrong was believing that leaders should be confident. Not just project confidence, but actually feel it. I thought that uncertainty was a sign of weakness, and that if my team saw me unsure about a decision, they'd lose faith in me. So I made decisions with conviction even when I wasn't convinced. I presented strategies as though they were certain even when they were speculative. I answered questions definitively even when the honest answer was, I don't know.

The cost of this was twofold. First, I made some bad decisions that I might have avoided if I'd allowed myself to sit in uncertainty long enough to explore alternatives. Second, and more damaging, I created a culture where uncertainty was hidden rather than discussed. My team learned that the way to be taken seriously was to sound confident, and they started doing the same thing. We became an organization that performed certainty rather than actually having it. The gap between our public confidence and our private doubts grew, and that gap made it harder to address real problems, because admitting a problem required admitting uncertainty, and we'd all learned that uncertainty was professionally dangerous.

The third thing I got wrong was believing that my job was to motivate people. I read the leadership books. I learned about inspirational leadership. I tried to rally the team with vision statements and motivational talks and team-building exercises. Some of it worked, briefly. But the effect was always temporary, and I eventually realized that I was trying to do something that couldn't be done from the outside.

Motivation is not something a leader provides. It's something people bring with them, or don't. What a leader can provide is clarity. Clear goals. Clear expectations. Clear feedback. Remove the obstacles that prevent people from doing their best work. That's it. The motivation to do the work has to come from the person doing it. And the more I tried to manufacture it, the more it felt manufactured, and the less authentic it was.

What I replaced these beliefs with is simpler but harder to practice. I now believe that leadership is about asking better questions, not having better answers. That uncertainty, honestly expressed, builds more trust than false confidence. That my job is not to be the ceiling but the floor — to create a foundation on which talented people can build things I couldn't build myself. That clarity is more valuable than inspiration. And that the most important thing I can do is to make the people around me more capable, not more dependent.

These aren't original insights. Many leadership thinkers have said similar things. But knowing them intellectually and living them are different. I still catch myself falling back into old patterns. I still have to resist the urge to answer too quickly, to project certainty I don't feel, to try to motivate when I should be clarifying. The old beliefs are comfortable. They made me feel like I was in control. The new beliefs require me to tolerate more ambiguity, to trust the process more, and to accept that my value as a leader is not in what I produce but in what I enable others to produce.

That last shift is the hardest. It means measuring my success by outcomes I didn't directly create. It means giving credit and taking blame. It means being in the room but not being the centre of the room. It's less glamorous than the leadership I imagined when I started. But it's more effective, and honestly, it's more satisfying, because the things that get built are bigger than anything I could have built alone.`
  },
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  for (const a of articles) {
    const slug = slugify(a.title);
    const exists = await prisma.article.findUnique({ where: { slug } });
    if (exists) {
      console.log(`Skip: ${slug}`);
      continue;
    }
    const wc = a.content.split(/\s+/).filter(Boolean).length;
    await prisma.article.create({
      data: {
        slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        topic: a.topic,
        published: false,
        featured: false,
        readTime: Math.max(1, Math.ceil(wc / 230)),
      },
    });
    console.log(`Created: ${slug}`);
  }
}

