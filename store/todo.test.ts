import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { useTodoStore } from './todo'

beforeAll(() => {
    setActivePinia(createPinia())
})

describe('useDotoStore', () => {
    let store: ReturnType<typeof useTodoStore>

    beforeEach(() => {
        store = useTodoStore()
    })

    afterEach(() => {
        store.$reset()
    })

    test('Store is created', () => {
        expect(store).toBeDefined()
    })

    test('Store initialize with empty items', () => {
        expect(store.items).toStrictEqual([])
    })

    test('Todo is created', () => {
        store.add({ title: 'Test code' })
        expect(store.items[0]).toBeDefined()
        expect(store.items[0].title).toBe('Test code')
    })
})