const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import {describe, jest, expect, it} from '@jest/globals'

// Import the router
const movieRouter = require('../app/movie-crud'); 

const app = express();
app.use(bodyParser.json());
app.use('/', movieRouter);

// Mock mongoose model
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockSave = jest.fn();
const mockRemove = jest.fn();
const mockFindOneAndUpdate = jest.fn();

mongoose.model = jest.fn().mockReturnValue({
  find: mockFind,
  findById: mockFindById,
  save: mockSave,
  remove: mockRemove,
  findOneAndUpdate: mockFindOneAndUpdate
});

const mockMovie = {
  _id: '60d5f484f8d7a51c889b0c25',
  moviTitle: 'Test Movie',
  moviLanguage: 'English',
  moviGenre: 'Action',
  moviPoster: 'poster.jpg',
  moviDirector: 'Test Director',
  moviActors: 'Actor1, Actor2'
};

describe('Movie API Tests', () => {
  beforeEach(() => {
    mockFind.mockReset().mockResolvedValue([mockMovie]);
    mockFindById.mockReset().mockResolvedValue(mockMovie);
    mockSave.mockReset().mockResolvedValue(mockMovie);
    mockRemove.mockReset().mockResolvedValue({ deletedCount: 1 });
    mockFindOneAndUpdate.mockReset().mockResolvedValue(mockMovie);
  });

  it('should fetch all movies', async () => {
    const response = await request(app).get('/getMovie');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMovie]);
  });

  it('should fetch a movie by id', async () => {
    const response = await request(app).get(`/getMovie/${mockMovie._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMovie]);
  });

  it('should add a new movie', async () => {
    const newMovie = {
      Title: 'New Movie',
      Language: 'Spanish',
      Genre: 'Drama',
      Poster: 'newposter.jpg',
      Director: 'New Director',
      Actors: 'New Actor1, New Actor2'
    };
    const response = await request(app).post('/addMovie').send(newMovie);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.moviTitle).toBe(newMovie.Title);
  });

  it('should delete a movie by id', async () => {
    const response = await request(app).delete(`/deleteMovie/${mockMovie._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('deletedCount', 1);
  });

  it('should update a movie by id', async () => {
    const updatedMovie = { moviTitle: 'Updated Title' };
    const response = await request(app).put(`/updateMovie/${mockMovie._id}`).send(updatedMovie);
    expect(response.status).toBe(200);
    expect(response.body.moviTitle).toBe(mockMovie.moviTitle);
  });
});