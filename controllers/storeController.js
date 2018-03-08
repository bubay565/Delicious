const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homepage = (req, res) => {
	res.render('index');
}

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
}

exports.createStore = async(req, res) => {
	const store = await(new Store(req.body)).save();
	req.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
	res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req, res) => {
	// Query DB for a list of stores
	const stores = await Store.find();
	res.render('stores', { title: 'Stores', stores });
}

exports.editStore = async ( req, res) => {
	//find store given the ID
	const store = await Store.findOne({ _id: req.params.id})
	//TOD: Confirm they are the owner of the store
	// Render out the edit form so users can update their stores
	res.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.updateStore = async (req, res) => {
	const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('seccess', `Successfully updated ${store.name}. <a href="/stores/${store.slug}">View Store </a>`);
	res.redirect(`/stores/${store._id}/edit`);
}
