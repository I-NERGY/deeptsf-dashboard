FROM node:14-alpine AS development

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

COPY package.json .

RUN npm install

# Copy app files
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD serve -s build

