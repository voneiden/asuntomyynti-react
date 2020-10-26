import React, { useState } from 'react';
import styles from './SearchForm.module.scss';
import { Button } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import Collapsible from '../../../../common/collapsible/Collapsible';
import { FilterConfigs, FilterName } from '../../../../types/common';
import TagList from './tag/TagList';
import { useTranslation } from 'react-i18next';
import useFilters from '../../../../hooks/useFilters';

type Props = {
  onSubmit: () => void;
  config?: FilterConfigs;
  isLoading: boolean;
};

const SearchForm = ({ config, onSubmit, isLoading }: Props) => {
  const { clearAllFilters, hasFilters } = useFilters();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { t } = useTranslation();

  const { project_district, room_count, living_area, sales_price, ...rest } = config || {};

  return (
    <div className={`${styles.container} ${showMoreOptions ? styles.expand : ''} ${isLoading ? styles.isLoading : ''}`}>
      <div className={styles.form}>
        <h1>Etsi Hitas-omistusasuntoja</h1>
        <div className={styles.row}>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {project_district && <Dropdown name={FilterName.ProjectDistrict} {...project_district} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {room_count && <Dropdown name={FilterName.RoomCount} {...room_count} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {living_area && <Dropdown name={FilterName.LivingArea} {...living_area} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {sales_price && <Dropdown name={FilterName.SalesPrice} {...sales_price} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {!isLoading && <Button onClick={() => onSubmit()}>Submit</Button>}
          </div>
        </div>
        <Collapsible expand={showMoreOptions}>
          <div className={styles.row}>
            <div className={styles.divider} />
          </div>
          <div className={styles.row}>
            {(Object.keys(rest) as FilterName[]).map<JSX.Element>((name) => (
              <div className={styles.column}>
                {(rest as FilterConfigs)[name] && <QueryFilter name={name} {...(rest as FilterConfigs)[name]} />}
              </div>
            ))}
          </div>
        </Collapsible>
        <div className={styles.row}>
          <div className={styles.column}>{config && <TagList config={config} />}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.divider} />
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <button
              className={styles.showMoreButton}
              onClick={() => {
                setShowMoreOptions(!showMoreOptions);
              }}
            >
              <span>{showMoreOptions ? t('SEARCH:show-less-options') : t('SEARCH:show-more-options')}</span>
            </button>
          </div>
          {config && hasFilters(config) && (
            <div className={styles.column}>
              <button onClick={() => clearAllFilters(config)} className={styles.clearFilters}>
                {t('SEARCH:clear-all-filters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
