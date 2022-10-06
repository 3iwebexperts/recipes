import './css/filters.css';
import React, { useRef } from 'react';
import Filresult from "./Results";
import FetchArticles from './FetchArticles';
import { useState } from 'react';

const Filter = (config) => {
  const initialFormData = {};
  config.config.filters.dropdowns.forEach((dropdown) => {
    initialFormData[dropdown.cid] = ''
  });
  initialFormData['q'] = '';
  const [errorMessage,setErrorMessage] = useState('Loading...');

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView({
    behavior: 'smooth', block: 'start'
  }); // run this function from an event handler or pass it to useEffect to execute scroll


  const initialTypes = {};
  config.config.filters.dropdowns.forEach((dropdown) => initialTypes[dropdown.cid] = dropdown.type);
  initialTypes['q'] = 'string';

  const [showError, setShowError] = React.useState(false);
  const [formData, updateFormData] = React.useState(initialFormData);
  const [ans, setAns] = React.useState('');
  let filterData = [];

  const ajaxCall = async (formData,initialTypes) => {
    const blogId = Object.keys(initialTypes).filter((key) => initialTypes[key] === 'blog').map((key) => formData[key]);
    const tags = Object.keys(initialTypes).filter((key) => ((initialTypes[key] === 'tags') && (formData[key] !== '') && (formData[key] !== null))).map((key) => formData[key]);
    const str = ((formData['q'] !== '') || (formData['q'] !== null)) ? formData['q'].trim().toLowerCase() : '';
    const articles = await FetchArticles(blogId[0], config.config.shop, '',[]);
    if(articles.length > 0){
      if((str !== '') && (str !== null)){
        Object.keys(articles)
          .filter((key) => articles[key].title.toLowerCase().includes(str))
          .forEach((key) => filterData.push(articles[key]));
      }
      if((tags !== null) && (tags.length > 0)){
        tags.forEach((tag) => {
          Object.keys(articles).forEach((key) => {
            let arttags = articles[key].tags;
            if(arttags.length > 0){
              arttags.forEach((t) => {
                if(t === tag){
                  filterData.push(articles[key]);
                }
              })
            }
          })
        })
      }
      if((filterData.length === 0) && ((str === '') || (str === null)) && ((tags === null) || (tags.length === 0))){
        filterData = articles;
      }
      if(filterData && filterData.length > 0){
        setErrorMessage('Loading...');
      }else{
        setErrorMessage('No results found from filter!');
      }
    }else{
      filterData = articles;
      setErrorMessage('No results found from filter!');
    }
    setAns(JSON.stringify(filterData));
  }

  const NoResultRender = (error) => {
    const sections = config.config.sections;
    let hasItems = false;
    if((typeof formData !== undefined) && (typeof formData !== 'undefined') && (typeof formData !== null) && (typeof formData !== '')){
      Object.keys(formData).forEach((k) => {
        if((formData[k] !== '') && (formData[k] !== null)){
          hasItems = true;
        }
      });
    };
    return(
      <>
        {hasItems === true && 
        <section className="filter_recipe_list">
          <div className="page-width">
            <div className="fil_lists_inner">
              <div className="recipe_items">
                <p>{error.error}</p>
              </div>
            </div>
          </div>
        </section>
        }
        {(sections.length > 0) && 
          sections.map((section,index) => {
            return (
              <section key={index} className="recipe_list">
                <div className="page-width">
                  <div className="recipe_list_inner">
                    <div className="list_tt">
                      <h2 className="block_heading title">{section.title}</h2>
                      <div className="recipe_items">
                        <Filresult Articles={JSON.stringify(section.articles)} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
      </>
    )
  };

  const ctaClickHandle = async(e) => {
    const bid = e.target.closest('.hex-3.hexes').getAttribute('data-id');
    const key = e.target.closest('.hex-3.hexes').getAttribute('data-select');
    if((bid !== '') && (key !== '') && (bid !== null) && (key !== null)){
      updateFormData({
        ...formData,
        [key]: bid
      });
      let all_options = document.querySelectorAll('#filter_form [name="blog_filter"] option');
      all_options.forEach((opt,index) => {
        if(opt.value === bid){
          opt.closest('select').selectedIndex = opt.index;
        }
      });
      executeScroll();
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    //handleSubmit(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const resetForm = () => {
    updateFormData(initialFormData);
  }

  React.useEffect(() => {
    let hasItems = false;
    if((typeof formData !== undefined) && (typeof formData !== 'undefined') && (typeof formData !== null) && (typeof formData !== '')){
      Object.keys(formData).forEach((key) => {
        if((key != 'q') && (formData[key] !== '') && (formData[key] !== null)){
          hasItems = true;
          return key;
        }
        return true;
      });
      if(hasItems !== true){
        setShowError(true);
      }else{
        ajaxCall(formData,initialTypes);
        setShowError(false);
      }
    }else{
      setShowError(true);
    }
    //executeScroll();
  },[handleSubmit]);

  return(
    <>
    <div className="page-width">
      <div className="blog_heading alco">
        <div className="diet_icon">
          <div className="share_recipe">
            <div className="share_item diet">
              <div className="hexagon">
                <div className="text">
                  <p><i className="fa-solid fa-burger"></i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1>{config.config.cta.title}</h1>
      </div>
      <div className="rec-pop col-md-12 table-c">
        <div className="table-d" style={{transform:`scale(1, 1)`}}>
          {config.config.cta.links.map((item,index) => 
            <div key={index} className="hex-1 hexes">
              <div className="hex-2 hexes">
                <div className="hex-3 hexes" onClick={ctaClickHandle} role="button" aria-label={`Filter by ${item.label}`} data-select={config.config.filters.dropdowns[0].cid} data-id={item.value} data-query={item.label} data-uw-rm-kbnav="role" tabIndex="0">
                  <div className="bg hexes lazyloaded" style={{backgroundImage: `url(${item.image})` }}></div>
                  <div className="overlay hexes"></div>
                  <span>{item.label}</span>
                </div>
              </div>
            </div>
          )}
          <div className="clear"></div>
        </div>
      </div>
      <div className="recipes_content">{config.config.cta.content}</div>
    </div>
    <section ref={myRef} className="filter_sec">
      <form id="filter_form" onReset={resetForm} onSubmit={handleSubmit}>
        <div className="page-width mrg_cls">
          <div className="filter_inner">
            {config.config.filters.dropdowns.map((dropdown,index) => 
              <div key={index} className="fil_item">
                <div className="fil_item_inner">
                  <div className="select">
                    <select
                      name={dropdown.cid}
                      id={dropdown.cid}
                      defaultValue={initialFormData[dropdown.cid]}
                      className="facet-filters__sort select__select caption-large"
                      onChange={handleChange}
                    >
                      <option value=''>{dropdown.title}</option>
                      {dropdown.options.map((option,i) => 
                        <option key={i} value={option.value}>{option.label}</option>
                      )}
                    </select>
                    <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-caret" viewBox="0 0 10 6">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className="fil_item">
              <button type="reset" value="Reset" className="button bottom_button_label">clear</button>
            </div>
{/*             
            <div className="fil_item search_frm">
              <div className="search-modal modal__content" role="dialog" aria-modal="true" aria-label="Search">
                <div className="modal-overlay"></div>
                <div className="search-modal__content">
                  <div className="field">
                    <input 
                      className="search__input field__input" 
                      type="text" 
                      placeholder="Search" 
                      name='q' 
                      defaultValue={initialFormData['q']} 
                      onChange={handleChange}
                      />
                    <button className="search__button field__button" aria-label="Search">
                      <svg className="icon icon-search" xmlns="
                        <http://www.w3.org/2000/svg>" width="19" height="19" viewBox="0 0 19 19">
                        <image id="search" width="19" height="19" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAZxJREFUOE+tlD0ohVEYx+/NTMhHynAHk8JAYhKDFEWuLMhHiljEwkKJwqUYbJLFYmGwGLBQyseIlNwsykfJYOX3fztH7729b/feN6d+nfOe8zz/85xznvcJh7xbLtOtUAFF8A53cAhvPj6hcNJCNt+zMAIXcAYfkAd10Ag7MGc2SHB3i5Wycgy3MAlPHhGUMLcCDdBibP/MrJgiuoJ9mIEfv6OY+Sn6CaiGV2trxWJMlEFnGkLWd4tBFgy6xXTZz1DlczS/IAtYeDR+cRkpsh7oh+YUR/Na3mXyEtat2BKDb5gPIDaGTw0MWbFtBtewGUCsC59e6LBieuovWAggNoqP8m/Aiuk1otAWQEynugcF5DxAIcRBqfGSgWAOtkrseniwYup1X1rsy0BsFdsI6N6cZpNWOXMDG7CWhuAiNuNQCcrRBDF9lMORYZpelSK5KXoVgmGzoD/mxEtMcyo3yyAjlZtz0L+nyGuhHU5BhUB3vAfdVjC5BNlNIgyUOzpGPnyCqskBOJdtWpNb0E/MZZ9yaAWj/yGm3VTfin8BQyxHqQE/bMEAAAAASUVORK5CYII="></image>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </form>
    </section>
    {((showError !== true) && (ans !== '[]') && (ans !== '') && (ans !== null)) ?
      <section className="filter_recipe_list">
        <div className="page-width">
          <div className="fil_lists_inner">
            <div className="recipe_items">
              <Filresult Articles={ans} />
            </div>
          </div>
        </div>
      </section>
    :
      <NoResultRender error={errorMessage} />
    }
    </>
  );
}

export default Filter;