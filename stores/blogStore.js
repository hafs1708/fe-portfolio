import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        data: null
        // data: {data: [], total: 10, maxPage: 2}
    }),
    getters: {
        blogs: (state) => state.data ? state.data.data : [],
        limit: (state) => state.data ? state.data.limit : 10,
        maxPage: (state) => state.data ? state.data.maxPage : 1,
        total: (state) => state.data ? state.data.total : 0
    },
    actions: {
        async get(page = 1, search = '') {
            const Api = useApiStore();
            this.data = await Api.get(`/blogs?limit=12&page=${page}&search=${search}`);
        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/blog/' + id)
        },
        async update(avatar) {
            const Api = useApiStore();
            const formData = new FormData();

            if (avatar) {
                // append avatar jika is null
                formData.append('avatar', avatar)
            }

            this.blogs = await Api.put('/blog', formData);
        }
    }
});