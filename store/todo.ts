import { remove } from "@vue/shared";
import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid'

export interface Todo {
    id: string,
    title: string,
    done: boolean,
    createdAt: Date,
    updatedAt: Date | null,
}

export interface TodoAdd {
    title: string
}

export interface TodoUpdate {
    title?: string,
    done?: boolean
}
export interface TodoState {
    items: Todo[]
}

const state = (): TodoState => ({
    items: [],
})

const getters = {
    getById: (state: TodoState) => (id: string) => {
        return state.items.find((item: Todo) => item.id === id)
    },
    getOrderedTodos: (state: TodoState) =>
        [...state.items].sort((a: Todo, b: Todo) =>
            a.createdAt.getTime() - b.createdAt.getTime())
}


export const useTodoStore = defineStore('todoStore', {
    state,
    getters,
    actions: {
        add(partialTodo: TodoAdd) {
            const todo: Todo = {
                id: uuid(),
                ...partialTodo,
                done: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            // FIXME remove push !
            this.items.push(todo)
        },
        remove(id: string) {
            this.items = this.items.filter(todo => todo.id !== id)
        },

        update(id: string, update: TodoUpdate) {
            this.items = this.items.map(item =>
                item.id === id ? { ...item, ...update, updatedAt: new Date() } : item)
        }

    }
})