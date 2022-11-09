# CS3219-AY22-23-Project-Skeleton

This is the repository for CS3219 Group 28 PeerPrep project.

## Run Project Locally
### Prerequisites
1. git
2. Docker desktop

### Steps
1. On your terminal, navigate to the directory where you want to store this project with the command:

	`cd <path of the directory>`

2. Clone this project to your local machine with the command:
	`git clone https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g28.git`

3. For each folder except `.github` and `gke`


## Access Project On Live

## User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

## Matching Service
1. Install npm packages using `npm i`.
2. Run Matching Service using `npm run dev`.

## Frontend
1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

## Question Service
This service is used to Create, Remove, Get the interview questions in the Room page.
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run Question Service using `npm start`.