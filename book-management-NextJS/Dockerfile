# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the project
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
