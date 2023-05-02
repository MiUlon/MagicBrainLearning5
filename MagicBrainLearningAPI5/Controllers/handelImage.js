export const handelImage = (req, res, postgres) => {
    const { id } = req.body;
    postgres('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(error => res.status(400).json('Cannot receive entries'));
};