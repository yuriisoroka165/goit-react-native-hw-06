export const selectAllPosts = state => state.post;
export const selectCurrentUserPosts = state => {
    return state.posts.posts.filter(
        item => (item.uid = state.authorization.userId)
    );
};
