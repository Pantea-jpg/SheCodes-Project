FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy all code
COPY . .

# Expose port
EXPOSE 3000

# Run app with ts-node
CMD ["npm", "run", "dev"]