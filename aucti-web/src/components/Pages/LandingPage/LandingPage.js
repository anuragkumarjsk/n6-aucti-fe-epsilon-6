import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProductsAction } from "../../../redux/actions/productActions";
import Cardlist from "../../Shared/cardlist";
import Quicklink from "../../Shared/Quicklink";
import FilterList from "../../Shared/filterList";
import Footer from "../../Layouts/Footer";
import { Banner } from "../../Shared/Banner";
import Pagination from "../../Shared/Pagination/Pagination";

function LandingPage(props) {
	const productlist = props.products;
	useEffect(() => {
		props.getProducts();
	}, []);

	return (
		<>
			<div
				id="main"
				className="grid items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1"
			>
				<Banner></Banner>

				<Cardlist productlist={productlist} />
			</div>
			<div className="grid justify-items-end p-4">
				<Pagination
					currentPage={1}
					totalCount={20}
					pageSize={5}
					// onPageChange={(page) => setCurrentPage(page)}
					// onNext={onNext}
					// onPrevious={onPrevious}
					// handlePageSelect={handlePageSelect}
				/>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		products: state.productsReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: () => dispatch(getProductsAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);