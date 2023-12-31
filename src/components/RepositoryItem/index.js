import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repository-name">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="min-img"
        />
        <p className="min-para">{starsCount} stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="min-img"
        />
        <p className="min-para">{forksCount} forks</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="min-img"
        />
        <p className="min-para">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
