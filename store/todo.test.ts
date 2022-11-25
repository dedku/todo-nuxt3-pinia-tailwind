import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { useTodoStore } from './todo'

beforeAll(() => {
    setActivePinia(createPinia())
})


describe('Store tests', () => {
    let store: ReturnType<typeof useTodoStore>

    beforeEach(() => {
        store = useTodoStore()
        store.items = testItems
    })

    afterEach(() => {
        store.items = []
    })

    const testItems = [
        {
            id: '1',
            title: 'Test One',
            done: false,
            createdAt: new Date(2021, 1, 8),
            updatedAt: null,
        },
        {
            id: '2',
            title: 'Test Two',
            done: false,
            createdAt: new Date(2022, 11, 11),
            updatedAt: null,
        },
        {
            id: '3',
            title: 'Test Three',
            done: false,
            createdAt: new Date(2017, 4, 28),
            updatedAt: null,
        },
        {
            id: '4',
            title: 'Test Four',
            done: false,
            createdAt: new Date(2019, 7, 3),
            updatedAt: null,
        },
    ]

    describe('Test Store', () => {
        test('Store is created', () => {
            expect(store).toBeDefined()
        })

        test('Store initialize with tested items', () => {
            expect(store.items).toStrictEqual(testItems)
        })

    })


    describe('Test Getters', () => {
        test('Get todo by id - getById', () => {
            const randomItem = store.items.find(item => item.id === '3');
            const todo = store.getById(randomItem!.id)

            expect(todo).toStrictEqual(todo)
        })

        test('Sort todos in a order - getOrderedTodos', () => {
            const orderedTodos = store.getOrderedTodos

            expect(orderedTodos[0].createdAt.getFullYear()).toBe(2017)
            expect(orderedTodos[1].createdAt.getFullYear()).toBe(2019)
            expect(orderedTodos[2].createdAt.getFullYear()).toBe(2021)
        })
        test('Getters DOES NOT mutate the state', () => {
            const newStore = [
                {
                    id: '1',
                    title: 'Test One',
                    done: false,
                    createdAt: new Date(2021, 1, 8),
                    updatedAt: null,
                },
                {
                    id: '2',
                    title: 'Test Two',
                    done: false,
                    createdAt: new Date(2022, 11, 11),
                    updatedAt: null,
                },
                {
                    id: '3',
                    title: 'Test Three',
                    done: false,
                    createdAt: new Date(2017, 4, 28),
                    updatedAt: null,
                },
                {
                    id: '4',
                    title: 'Test Four',
                    done: false,
                    createdAt: new Date(2019, 7, 3),
                    updatedAt: null,
                },
            ]

            expect(store.items).toStrictEqual(newStore)
        })
    })

    describe('Test Actions', () => {
        test('Todo is created', () => {
            store.add({ title: 'Test code' })
            const addedItem = store.items.find(item => item.title === 'Test code')

            expect(addedItem).toBeTruthy()
            expect(addedItem!.title).toBe('Test code')
        })

        test('Todo is removed', () => {
            store.remove('1')
            store.remove('2')
            store.remove('3')

            expect(store.items[0].id).toBe('4')
        })

        test('Todo is updated', () => {
            const newTitle = 'testTitle'
            const newUpdate = { title: newTitle }
            store.update('4', newUpdate)

            expect(store.items[3].title).toBe(newTitle)
        })
    })
})