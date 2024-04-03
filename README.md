# HA-Energy-Website
![image](https://github.com/LifeofDan-EL/HA-Energy-Website/assets/45920948/0b98163d-b5ed-4daa-aaff-e41af0294780)

## About
This is an express js application that allows you to build a mini public website for your Home Assistant setup. For now, I am only able to use data for a specific day. Hopefully, people get to play around with this and spurn up different use cases.

I have the [Cloudflared add-on](https://github.com/brenner-tobias/addon-cloudflared/) set up and I am using the API from it for my configuration.  You have to set up a self-hosted application on the Cloudflare Zero Trust dashboard. Then make a policy which has the action of service auth, it helps you solve the CORS error I was having [here](https://community.home-assistant.io/t/new-add-on-cloudflared/361637/667?u=lifeofdan-el).

**Policy Settings**
![image](https://github.com/LifeofDan-EL/HA-Energy-Website/assets/45920948/2b48b371-aad9-4d7b-8b3f-31fb0f0ea8a2) 
**CORS Settings**
![image](https://github.com/LifeofDan-EL/HA-Energy-Website/assets/45920948/14268221-f1c6-4bd6-829f-2c54b4036810)



##  Installation
Clone the repo, ```cd``` into the folder, run ```npm install``` then ```node --watch app.js```. Make sure you have node and the required packages installed on your PC. 
Also, create your .env file which should have something like this.
```
API_URL=https://xyz.xyz/api/states
API_TOKEN=xyz
```

## License

MIT License

Copyright (c) 2024 LifeofDan-EL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


