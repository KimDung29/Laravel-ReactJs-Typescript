# Use the official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /var/www/frontend
WORKDIR /var/www/frontend

# Copy the current directory contents into the container at /var/www/frontend
COPY . /var/www/frontend

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable (nếu cần)
# ENV REACT_APP_BACKEND_API=http://backend:8000

# Run your React app (thay đổi lệnh này nếu cần)
CMD ["npm", "start"]





