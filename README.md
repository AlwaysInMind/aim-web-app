# Stop Press!

We're finalists in the AbilityNet and BT [Tech4GoodAwards](https://www.tech4goodawards.com/finalist/always-in-mind/). You can vote for us in the Peoples Award using #T4GAlwaysinMind on twitter or instagram or on the previous webpage. Thanks.

# Always in Mind

Always in Mind is a web app providing simplified, friendly and safe access to the websites and digital communications services that we use daily. Services such as Google Photos, YouTube, Gmail and Facebook are transformed so they can be easily accessed by people who would otherwise not want to use technology, have certain cognitive disabilities or do not have the digital skills required by complex services.

![A screenshot showing buttons and text](screenshots/actvities.png 'The activity selection screen with the supporters bar showing')

![A screenshot showing buttons, text and a photo of a dog](screenshots/photos.png 'The photos slideshow screen showing Google photos')

The vision of Always In Mind is to be a flexible 'eWellbeing' platform designed to help reduce isolation, boost confidence and improve the quality of life of people who may have be in later stages of life, have cognitive disabilities including dementia or and learning difficulties or be someone who has recently had a stroke. These may be excluded from using the available social connectivity and media access provided by popular online digital services. For example, with Always In Mind they can share photos, or videos, access music or interesting information resources or engage with others via messages and video calls. All this without need to navigate or learn complex User Interfaces. This can enable closer communication with remote family and friends, extend social connections to new people or carers and even public services.

With Always in Mind, a relative, friend or supporter can use their favourite digital services as usual, for example to share photos or send a message, and Always In Mind integrates with the services to make the media and messages easily accessible through an alternative and simplified user experience running on an PC, tablet, a TV or kiosk. The user can select from various levels of UI complexity are provided to suit the user’s preferences. Plus help is always available to provide a ready reminder and reduce stress.

To summerise, Always In Mind:

- Provides users with simplified access to media and communications enabled by popular services or indeed custom services
- Provides users a friendly uncluttered and consistent experience
- Integrates with external services to provide access to managed resources and communications
- Features of external services are used to mark resources to be accessed or communicate
- Provides an open source platform to encourage the use ogf and innovate cognitive accessibility and low digital literacy

# Live Demo

See the [video](http://youtu.be/LyJbLxjIls8?a)

Try the latest version at https://alwaysinmind.org using the demo user (no account required) or log in with a Google account for the user. Here is the [User Guide](https://github.com/AlwaysInMind/aim-web-app/wiki/User-Guide-for-Always-in-Mind) which can be found on the wiki.

Follow us on [Twitter](https://twitter.com/AlwaysInMind_).

# Open Source Project and a Self Sustaining Service

General accessibility knowledge and support for people with cognitive disabilities lags far behind others such as sensory and motor. Thus, innovation needs to be encouraged and nurtured. As a small step, Always In Mind is fully open source in order to encourage open innovation and collaboration. We hope to encourage an active community of people interested in improving provision. Both the front end and back end code can be found here in this repository and by using readily available dependencies and services we hope others can readily reproduce and experiment with innovative ideas. We've used the permissive MIT licence but hope contributions will be made back to us.

However, people want to be customers of a reliable and well supported service. So we need to develop a self sustaining product. This probably requires a crystal clear problem definition and solution that people will be willing to payfor. We are currently exploring ideas and are keen to collaborate in order to get this into the hands of people whom will benefit. Our current thinking is presented at https://alwaysinmind.info but needs much refinement.

Currently we have decided to bootstrap rather than seek seed funding as we think the constraints will force us to develop a more user focussed product and shareholders would dilute the focus on users. However we have not ruled out going the Social Enterprise / CIC route and academic funding is a good possibility, especially if it enables clearer problem definition and user validation.

# Benefits of Always In Mind

- Provides simplified, friendly and safe access to everyday digital resources and communications
- Reduces isolation and boost confidence through simplified digital sharing with friends, both local and remote
- Easy access to remote family and friend's activities through photos, videos, messages and video calls
- Enables engagement in social activities being promoted or organised online.
- Entertains and educates through online resources such as information, music and videos
- Encourage and reassure digital engagement can be safe, fun and useful
- Support varying abilities over time thus supporting reducing or increasing capabilities
- As the UK Government design principles state, we [do the hard work to make it simple](https://www.gov.uk/guidance/government-design-principles#do-the-hard-work-to-make-it-simple)

# Features

- Supports people with various cognitive disabilities and low digital literacy
- Uncluttered layouts with large friendly touch buttons to perform only "safe" actions
- Simple and consistant navigation between screens to avoid getting lost
- Select and view videos, photos, music, webpages, messages and video calls
- Guidance and help through Computer Speech and / or text
- Easy read conversion of web pages
- Personalisation through selectable levels of UI complexity - eg more available buttons and actions
- Works on any device with a modern web browser and internet connectivity - tablet, desktop, TV, kiosk or larger phone.

# Current Service Integrations

- Google photos - shows albums and photos including videos
- YouTube - shows videos in playlists
- GMail - read latest email
- Google Tasks - tasklist used to provide a list of web pages to view (under review)
- Microsoft cognitive services picture description AI - creates descriptions of photos
- Auth0 - secure authorisation and access management

# Possible Enhancements

- Reminders - e.g. to take medication
- Reminiscence activities
- Integration with controls, sensors and alarms (eg smart homes and IoT)
- Utilises AI to support users - Microsoft [cognitive services](https://azure.microsoft.com/en-us/services/cognitive-services/) are a great place to start
- Speech input using Echo, Cortana etc

# Roadmap

We now have enough a useable technical prototype at https://alwaysinmind.org suitable to to put before users to find out what their needs and preferences really are. Thus, the next steps is user research, We then want to get the live paid services working ASAP so people can start benefiting. Call it LEAN product development if you like :)

- Add activites that require text entry - eg reply to an message

# Technical notes

A Reactjs powered SPA web app for maximum portability. A nodejs backend to abstract the various services and handle sensitive operations.

# History

Several years ago I developed an accademic prototype for Prof Peter Cudd and others at Sheffield University ScHARR RATS group (Now CATCH) designed to explore people with dementia using technology in a care home environment. This was [MAAVIS](http://maavis.fullmeasure.co.uk/) and was fairly successful in getting people to engage and socialise through the tech. We even had Silvia Syms liking it. While care and adult education staff expressed considerable interest, it was clear they needed a product and service, but this was an EU funded project at the end of the term.

As little like it has appeared since then, I decided to take some time to develop a product (well a service) using modern Web technology that has enabled many of the original ideas and more. Thus Always in Mind was born. We greatfull for the GPII related EU FP7 projects Cloud4All and Prosperity4All for providing funding that enabled us to explore some of the ideas and code that ALwaysInMind Builds on.

# A "Shout out" to some of the great tools we use

- Web Standards - for the most portable solution
- Visual Studio Code - for the best dev experience
- Zeit now - for a great serverless devops experience
- Auth0 - for the best identity management and authentication experience
- Synk - security auditing
- Javascript - because...
- Reactjs - well it works well
- nodejs
- npm
- Webpack, ESLint, prettier and many other great tools and libs used in modern web dev
- Egghead.io for the absolute best teaching in JavaScript tools and frameworks from industry pros

We use the [Mulberry Symbols](https://github.com/straight-street/mulberry-symbols) in the speech activity.

Also see [Current Service Integrations](#current-service-integrations) above.
