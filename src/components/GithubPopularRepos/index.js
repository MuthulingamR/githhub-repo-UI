import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    reposList: [],
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  activeFilterTab = id => {
    this.setState({activeFilterId: id}, this.getRepositoryList)
  }

  getRepositoryList = async () => {
    const {activeFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const reposList = data.popular_repos
      const updatedData = reposList.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryDetails = () => {
    const {reposList} = this.state

    return (
      <ul className="repo-ul-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureDetails = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderTotalRepo = () => {
    const {activeFilterId} = this.state

    return (
      <>
        <h1 className="main-heading">Popular</h1>
        <ul className="filter-ul-list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageDetails={each}
              activeFilterTab={this.activeFilterTab}
              isActive={each.id === activeFilterId}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="github-container">
            <div className="responsive-container">
              {this.renderTotalRepo()}
              {this.renderLoader()}
            </div>
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="github-container">
            <div className="responsive-container">
              {this.renderTotalRepo()}
              {this.renderRepositoryDetails()}
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="github-container">
            <div className="responsive-container">
              {this.renderTotalRepo()}
              {this.renderFailureDetails()}
            </div>
          </div>
        )
      default:
        return null
    }
  }
}

export default GithubPopularRepos
