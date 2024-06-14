import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';

// Register a font family and its variants
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlvAw.ttf', fontWeight: 'bold' },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    marginBottom: 3,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  contactInfo: {
    marginBottom: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: 'black', 
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  horizontalListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  link: {
    fontSize: 12,
    marginBottom: 3,
    marginRight: 10,
    color: 'blue',
  },
  text: {
    fontSize: 11,
    marginBottom: 3,
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const formatUrl = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const Pdf = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{formData.contactInfo.fullName}</Text>
        <View style={styles.horizontalListContainer}>
          <Text style={styles.text}>{formData.contactInfo.phoneNumber} </Text>
          <Text style={styles.text}> {formData.contactInfo.address}</Text>
        </View>
        <View style={styles.horizontalListContainer}>
          <Link src={`mailto:${formData.contactInfo.email}`}>
            <Text style={styles.link}>{formData.contactInfo.email}</Text>
          </Link>
          {formData.contactInfo.extraLinks.map((link, index) => (
            <Link key={index} src={formatUrl(link.url)}>
              <Text style={styles.link}>{link.label}</Text>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Objective</Text>
        <Text style={styles.text}>{formData.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Education</Text>
        {formData.education.map((edu, index) => (
          <View key={index} style={{marginBottom: 2}}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {edu.degree}
                </Text>
                <Text style={styles.text}>, {edu.school}</Text>
              </View>
              <Text style={styles.text}>{edu.duration}</Text>
            </View>
            
            <Text style={styles.text}>{edu.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Work Experience</Text>
        {formData.workExperience.map((exp, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Text style={styles.title}>{exp.jobTitle}</Text>
              <Text style={styles.text}>{exp.from} - {exp.to}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{exp.employer}</Text>
              <Text style={styles.text}>{exp.location}</Text>
            </View>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {formData.customSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.header}>{section.title}</Text>
          {section.items.map((item, idx) => (
            <View key={idx}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default Pdf;
