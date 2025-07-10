import React, { useState, useContext } from 'react';
import { VerseContext } from '../VerseContext';
import {
  View,
  Text,
  SectionList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Share,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const groupVerses = (verses, showFavoritesOnly) => {
  const sections = {
    'Recently Reviewed': [],
  };

  verses.forEach((verse) => {
    if (showFavoritesOnly && !verse.isFavorite) return;

    if (verse.reviewed) {
      sections['Recently Reviewed'].push(verse);
    } else {
      const book = verse.reference.split(' ')[0];
      if (!sections[book]) sections[book] = [];
      sections[book].push(verse);
    }
  });

  return Object.keys(sections).map((title) => ({
    title,
    data: sections[title],
  }));
};

const MyVersesScreen = () => {
  const { verses, toggleFavorite } = useContext(VerseContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleVersePress = (verse) => {
    navigation.navigate('Review', {
      reference: verse.reference,
      text: verse.text,
    });
  };

  const handleLongPress = async (verse) => {
    try {
      await Share.share({
        message: `${verse.reference} - ${verse.text}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const filtered = verses.filter((v) => {
    const query = searchQuery.toLowerCase();
    return (
      v.reference.toLowerCase().includes(query) ||
      v.text.toLowerCase().includes(query)
    );
  });

  const grouped = groupVerses(filtered, showFavoritesOnly);

  const toggleSection = (title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderVerse = ({ item }) => (
    <TouchableOpacity
      style={styles.verseCard}
      onPress={() => handleVersePress(item)}
      onLongPress={() => handleLongPress(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.reference}>{item.reference}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.reference)}>
          <Text style={styles.favorite}>{item.isFavorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.preview} numberOfLines={1}>
        {item.text}
      </Text>
      <View style={styles.metaRow}>
        {item.tags?.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
        <Text style={styles.status}>{item.status}</Text>
        <TouchableOpacity>
          <Text style={styles.planLink}>+ Plan</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search verses..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setShowFavoritesOnly((prev) => !prev)}>
          <Text style={styles.favToggle}>
            {showFavoritesOnly ? 'Show All' : 'Show Favorites'}
          </Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={grouped}
        keyExtractor={(item) => item.reference}
        stickySectionHeadersEnabled
        renderItem={({ item, section }) =>
          collapsedSections[section.title] ? null : renderVerse({ item })
        }
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(title)}
          >
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionToggle}>
              {collapsedSections[title] ? '▸' : '▾'}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No verses found.</Text>
        }
      />
    </Animated.View>
  );
};

export default MyVersesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  favToggle: {
    color: '#007aff',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionToggle: {
    fontSize: 16,
    color: '#888',
  },
  verseCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reference: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  favorite: {
    fontSize: 20,
    color: '#f1c40f',
  },
  preview: {
    fontSize: 14,
    color: '#555',
    marginVertical: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    color: '#333',
    marginRight: 4,
  },
  status: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  planLink: {
    marginLeft: 'auto',
    fontSize: 13,
    color: '#007aff',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});
