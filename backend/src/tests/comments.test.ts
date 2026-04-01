/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from '../index.js';
import { supabase } from '../supabase.js';
import request from 'supertest';
vi.mock('../supabase.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

const mockChain = (overrides: Record<string, any> = {}) => {
  const chain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    ...overrides,
  };

  vi.mocked(supabase.from).mockReturnValue(chain as any);
  return chain;
};

describe('Comments - get', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve retornar a lista de  comentarios', async () => {
    const mockComments = [{ id: '1', body: 'mike', email: 'mike@teste.com' }];

    mockChain({
      order: vi.fn().mockResolvedValue({ data: mockComments, error: null }),
    });

    const response = await request(app).get('/texts/1/comments')

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockComments);
  });

  it('Deve retornar 400 quando o Supabase falha', async () => {
  mockChain({
    order: vi.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
  });

  const response = await request(app).get('/texts/1/comments');

  expect(response.status).toEqual(400);
  expect(response.body).toEqual({ error: 'Database error' });
});

it('Deve criar um comentário com sucesso', async () => {
  const mockComment = { id: '1', body: 'Great text!', author_id: 'user-1', text_id: '1' };

  mockChain({
    single: vi.fn().mockResolvedValue({ data: mockComment, error: null }),
  });

  const response = await request(app)
    .post('/texts/1/comments')
    .send({ body: 'Great text!', author_id: 'user-1' });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual(mockComment);
});


  
});