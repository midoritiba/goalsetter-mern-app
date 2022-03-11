import {Link} from 'react-router-dom'

const Publish = () => {
  return (
    <section className="px-4 py-5 my-5 text-center">
        <img src={require("../assets/publish-img.jpg")} className="d-block mx-auto mb-4 img-fluid" alt="Publish your recipe for FREE today" width="1000" height="408" loading="lazy" />
        <h1 className="display-5 fw-bold">Publish your recipe for FREE today</h1>
        <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
                Publish your Recipe in front of thousands of people for free
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/submit" className="btn btn-primary btn-dark btn-lg">Submit Recipe</Link>
            </div>
        </div>
    </section>
  )
}

export default Publish