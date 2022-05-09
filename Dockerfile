FROM node:14-alpine
WORKDIR /api
COPY package*.json ./

COPY . .
#Rebuild bcrypt After bpm insatll
RUN npm i

EXPOSE 6969
CMD [ "npm", "run", "dev" ]