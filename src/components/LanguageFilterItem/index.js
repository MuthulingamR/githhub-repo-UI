import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeFilterTab, isActive} = props
  const {id, language} = languageDetails

  const activeBtn = isActive ? 'btn active-btn' : 'btn'

  const onClickFilterItem = () => {
    activeFilterTab(id)
  }

  return (
    <li className="filter-item-container">
      <button type="button" onClick={onClickFilterItem} className={activeBtn}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
