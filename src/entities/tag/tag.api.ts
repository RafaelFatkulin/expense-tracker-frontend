import type { SuccessMessage } from '~shared/api';
import { api } from '~shared/api';
import type { CreateTagDto, Tag, UpdateTagDto } from './tag.types';

const URL = '/transaction-tags';

export const createTag = async (createTagDto: CreateTagDto) => {
  const response = await api.post<SuccessMessage>(URL, createTagDto);
  return response.data;
};

export const updateTag = async (params: { id: number; updateTagDto: UpdateTagDto }) => {
  const response = await api.patch<SuccessMessage>(`${URL}/${params.id}`, params.updateTagDto);
  return response.data;
};

export const deleteTag = async (id: number) => {
  const response = await api.delete<SuccessMessage>(`${URL}/${id}`);
  return response.data;
};

export const getOneTag = async (id: number) => {
  const response = await api.get<Tag[]>(`${URL}/${id}`);
  return response.data;
};

export const getAllTags = async () => {
  const response = await api.get<Tag[]>(URL);
  return response.data;
};
