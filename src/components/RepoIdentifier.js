import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from 'grommet';

export const RepoIdentifier = ({ title, subTitle, subSubTitle, htmlUrl, size, ...rest }) => (
  <Box align="center" {...rest}>
    <Box>
      <a href={ htmlUrl } target='repoWindow'>
        { title }
      </a>
      <Text size={ size }>{ subTitle }</Text>
      <Text size="xsmall" font-weight="lighter">{ subSubTitle }</Text>
    </Box>
  </Box>
);

RepoIdentifier.propTypes = {
  title: PropTypes.string,
  html_url: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  subSubTitle: PropTypes.string,
};

RepoIdentifier.defaultProps = {
  size: 'medium',
  subTitle: undefined,
  title: undefined,
  html_url: undefined,
  subSubTitle: undefined,
};
