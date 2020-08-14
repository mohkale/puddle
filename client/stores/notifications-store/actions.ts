import { createAction } from '@reduxjs/toolkit';
import { Notification } from './notifications';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const notificationAdded = createAction<Notification<any>|Notification<any>[]>('notification/added')

export const notificationRemoved = createAction<string>('notification/removed')

export const notificationsFetched = createAction<Notification<any>[]>('notification/fetched')

export const notificationDeleted = createAction<string>('notification/deleted')

export const notificationsArchiveExhausted = createAction('notification/archive-exhausted')
