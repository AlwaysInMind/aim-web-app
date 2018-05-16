# Always in Mind

Always in Mind is a web app providing simplified, friendly and safe access to the websites and digital communications services that we use daily. Services such as Google Photos, YouTube, Gmail and Facebook are transformed so they can be easily accessed by people who would otherwise not want to use technology, have certain cognitive disabilities or do not have the digital skills required by complex services.

This project is a flexible platform designed to help reduce isolation and improve the quality of life of people who may have be in later stages of life, cognitive disabilities, such as dementia or adults with learning difficulties someone who has recently had a stroke. They could potentially benefit greatly from the social connectivity and ready access to media provided by online digital services . For example, they can share photos, or videos, access music or interesting information resources or engage with others via messages and video calls. This can enable closer communication with remote family and friends or even extend social connections to new people. 

A relative, friend or supporter can use their favourite digital services as usual, for example to share photos or send a message, and Always In Mind integrates with the services to make the media and messages easily accessible through an alternative and simplified user experience running on an PC, tablet, a TV or kiosk. The user can select from various levels of UI complexity are provided to suit the user’s preferences. Plus help is always available to provide a ready reminder and reduce stress.

# Live Demo

Try the latest version at https://alwaysinmind.now.sh using the demo user (no account required) or log in with a Google account for the user. Here is the [User Guide](https://github.com/AlwaysInMind/aim-web-app/wiki/User-Guide-for-Always-in-Mind) which can be found on the wiki.

Follow us on [Twitter](https://twitter.com/AlwaysInMind_).

# Open Source Project and a Self Sustaining Service

General accessibility knowledge and support for people with cognitive disabilities lags far behind others such as sensory and motor. Thus, innovation needs to be encouraged and nurtured. As a small step, Always In Mind is fully open source in order to encourage open innovation and collaboration. We hope to encourage an active community of people interested in improving provision. Both the front end and back end code can be found here in this repository and by using readily available dependencies and services we hope others can readily reproduce and experiment with innovative ideas. We've used the permissive MIT licence but hope contributions will be made back to us.

However, people want to be customers of a reliable and well supported service. So we need to develop a self sustaining product. This probably requires a crystal clear problem definition and solution that people will be willing to payfor. We are currently exploring ideas and are keen to collaborate in order to get this into the hands of people whom will benefit. Our current thinking is presented at https://alwaysinmind.info but needs much refinement. 

Currently we have decided to bootstrap rather than seek seed funding as we think the constraints will force us to develop a more user focussed product and shareholders would dilute the focus on users. However we have not ruled out going the Social Enterprise / CIC route and academic funding is a good possibility, especially if it enables clearer problem definition and user validation.

# Benefits of Always In Mind
* Provides simplified, friendly and safe access to everyday digital resources and communications
* Reduces isolation through simplified digital sharing with friends, both local and remote
* Easy access to remote family and friend's activities through photos, videos, messages and video calls
* Enables engagement in social activities being promoted or organised online.
* Entertains and educates through online resources such as information, music and videos
* Encourage and reassure digital engagement can be safe, fun and useful
* Support varying abilities over time thus supporting reducing or increasing capabilities

# Features
* Supports people with various cognitive disabilities and low digital literacy
* Uncluttered layouts with large friendly touch buttons to perform only "safe" actions
* Simple and consistant navigation between screens to avoid getting lost
* Select and view videos, photos, music, webpages, messages and video calls
* Guidance and help through Computer Speech and / or text
* Easy read conversion of web pages
* Personalisation through selectable levels of UI complexity - eg more available buttons and actions
* Works on any device with a modern web browser and internet connectivity - tablet, desktop, TV, kiosk or larger phone.

# Possible Enhancements

* Reminders - e.g. to take medication
* Reminiscence activities
* Integration with controls, sensors and alarms (eg smart homes and IoT)
* Utilises AI to support users
* Speech input using Echo, Cortana etc

# Current Service Integrations

* Google photos - shows albums and photos including videos
* YouTube - shows videos in playlists
* GMail - read latest email
* Google Tasks - tasklist used to provide a list of web pages to view (under review)
* Microsoft cognitive services picture description AI - creates descriptions of photos
* Auth0 - secure authorisation and access management

# Roadmap

We now have enough a useable technical prototype at https://alwaysinmind.now.sh suitable to to put before users to find out what their needs and preferences really are. Thus, the next steps is user research, We then want to get the live paid services working ASAP so people can start benefiting. Call it LEAN product development if you like :)

# Technical notes

A Reactjs powered SPA web app for maximum portability. A nodejs backend to abstract the various services and handle sensitive operations.

# A "Shout out" to some of the great tools we use 

* Web Standards - for the most portable solution
* Visual Studio Code - for the best dev experience
* Zeit now - for a great serverless devops experience
* Auth0 - for the best identity management and authentication experience
* Synk - security auditing
* Javascript - because...
* Reactjs - well it works well
* nodejs
* Yarn
* Webpack, ESLint, prettier and many other great tools and libs used in modern web dev

Also see [Current Service Integrations](#current-service-integrations) above.
