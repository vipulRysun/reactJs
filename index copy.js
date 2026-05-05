import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

import {useTheme, verticalScale, scale} from '@theme';
import {AppContainer, CustomHeader} from '@components/atoms';
import Loader from '@components/Loader';
import {NavScreen} from '@utils/constant';
import {SuppliersQuery} from '@services';
import styles from './styles';

// ─── Icon (unicode stand-ins) ─────────────────────────────────────────────────
const Icon = ({name, size = 20, color}) => {
    const map = {
        arrow_back: '←',
        verified_user: '✓',
        location_on: '📍',
        person: '👤',
        description: '📄',
        payments: '💳',
        event_busy: '⏰',
    };
    return (
        <Text style={{fontSize: size, color, lineHeight: size + 4}}>
            {map[name] ?? '●'}
        </Text>
    );
};

// ─── Chart bar colors ──────────────────────────────────────────────────────────
const agingBuckets = [
    {label: '0-30', heightPct: 0.5, color: '#4edea3'},
    {label: '31-60', heightPct: 0.65, color: '#d0e1fb'},
    {label: '61-90', heightPct: 0.2, color: 'rgba(232,55,55,0.4)'},
];
const spendData = [0.3, 0.5, 0.6, 0.75, 0.55, 0.9];

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SupplierProfile = () => {
    const {t} = useTranslation();
    const {theme, variant} = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const {_id} = route.params || {};

    const {data: supplierDetails, isLoading} = useQuery({
        queryKey: ['supplierDetails', _id],
        queryFn: () => SuppliersQuery.getSupplierDetails(_id),
        enabled: !!_id,
    });

    const supplierName = supplierDetails?.name || '—';
    const supplierEmail = supplierDetails?.email || '';
    const supplierAddress = supplierDetails?.address || '';

    const initials = supplierName
        .split(' ')
        .slice(0, 2)
        .map(word => (word[0] || '').toUpperCase())
        .join('');

    const onPressBack = () => navigation.goBack();
    const onPressEdit = () =>
        navigation.navigate(NavScreen.UPDATE_SUPPLIER, {_id});

    const BAR_MAX_H = verticalScale(80);

    // Activities use live theme colors
    const activities = [
        {
            icon: 'description',
            title: 'Purchase Order #PO-2024-045 issued',
            time: 'Today • 09:30 AM',
            amount: '$8,500.00',
            amountColor: theme.buttonColor,
            opacity: 1,
        },
        {
            icon: 'payments',
            title: 'Bill Payment Sent',
            time: 'Yesterday • 2:45 PM',
            amount: '-$6,200.00',
            amountColor: theme.error,
            opacity: 0.6,
        },
    ];

    return (
        <LinearGradient
            colors={[theme.bg_gradient_1, theme.bg_gradient_2]}
            style={styles.flex1}>
            <AppContainer edges={['top', 'bottom']}>
                <StatusBar
                    backgroundColor={theme.bg_gradient_1}
                    hidden={false}
                    barStyle={
                        variant === 'dark' ? 'light-content' : 'dark-content'
                    }
                />

                {/* ── Header ── */}
                <View style={styles.headerContainer}>
                    <CustomHeader
                        containerStyle={styles.customHeaderContainer}
                        isBack={true}
                        title={t('supplier_stack.supplier_profile')}
                        onBack={onPressBack}
                    />
                    <TouchableOpacity
                        onPress={onPressEdit}
                        style={styles.editBtn}>
                        <Text
                            style={[
                                styles.editBtnText,
                                {color: theme.buttonColor},
                            ]}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    {/* ── Profile Hero Card ── */}
                    <View
                        style={[
                            styles.heroCard,
                            {backgroundColor: theme.darkThemeOuterBgColor},
                        ]}>
                        <View style={styles.heroBlob} />
                        <View style={styles.heroTopRow}>
                            <View
                                style={[
                                    styles.avatarContainer,
                                    {backgroundColor: theme.commonBorderColor},
                                ]}>
                                <Text
                                    style={[
                                        styles.avatarInitials,
                                        {color: theme.white},
                                    ]}>
                                    {initials || '?'}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.premiumBadge,
                                    {backgroundColor: theme.buttonColor},
                                ]}>
                                <Text style={styles.premiumBadgeText}>
                                    SUPPLIER
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.heroTitle}>{supplierName}</Text>
                        <View style={styles.heroSubRow}>
                            <Icon
                                name="verified_user"
                                size={scale(12)}
                                color={theme.textSecondary}
                            />
                            <Text
                                style={[
                                    styles.heroSubText,
                                    {color: theme.textSecondary},
                                ]}>
                                {'  Trusted Vendor Account'}
                            </Text>
                        </View>
                    </View>

                    {/* ── Financial Status Card ── */}
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: theme.commonBgColor,
                                borderColor: theme.commonBorderColor,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.cardLabel,
                                {color: theme.textSecondary},
                            ]}>
                            Outstanding Balance
                        </Text>
                        <View style={styles.balanceRow}>
                            <Text
                                style={[
                                    styles.balanceAmount,
                                    {color: theme.buttonColor},
                                ]}>
                                $18,750.00
                            </Text>
                            <View
                                style={[
                                    styles.dueBadge,
                                    {backgroundColor: theme.warningBgColor},
                                ]}>
                                <Icon
                                    name="event_busy"
                                    size={scale(12)}
                                    color={theme.error}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.dueBadgeText,
                                        {color: theme.error},
                                    ]}>
                                    {' Due in 10 days'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.divider,
                                {backgroundColor: theme.separatorBorderColor},
                            ]}
                        />
                        <View style={styles.metricsRow}>
                            <View>
                                <Text
                                    style={[
                                        styles.metricLabel,
                                        {color: theme.textSecondary},
                                    ]}>
                                    Last Payment
                                </Text>
                                <Text
                                    style={[
                                        styles.metricValue,
                                        {color: theme.textPrimary},
                                    ]}>
                                    $6,200.00
                                </Text>
                            </View>
                            <View style={styles.alignEnd}>
                                <Text
                                    style={[
                                        styles.metricLabel,
                                        {color: theme.textSecondary},
                                    ]}>
                                    Credit Terms
                                </Text>
                                <Text
                                    style={[
                                        styles.metricValue,
                                        {color: theme.textPrimary},
                                    ]}>
                                    Net 30
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* ── Contact Information ── */}
                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {color: theme.buttonColor},
                            ]}>
                            Contact Information
                        </Text>
                        {!!supplierAddress && (
                            <View
                                style={[
                                    styles.contactCard,
                                    {
                                        backgroundColor:
                                            theme.selectedItemBgColor,
                                    },
                                ]}>
                                <Icon
                                    name="location_on"
                                    size={scale(20)}
                                    color={theme.buttonColor}
                                />
                                <View style={styles.contactInner}>
                                    <Text
                                        style={[
                                            styles.contactPrimary,
                                            {color: theme.textPrimary},
                                        ]}>
                                        {supplierAddress}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View
                            style={[
                                supplierAddress
                                    ? styles.contactCardSpaced
                                    : styles.contactCard,
                                {backgroundColor: theme.selectedItemBgColor},
                            ]}>
                            <Icon
                                name="person"
                                size={scale(20)}
                                color={theme.buttonColor}
                            />
                            <View style={styles.contactInner}>
                                <Text
                                    style={[
                                        styles.contactPrimary,
                                        {color: theme.textPrimary},
                                    ]}>
                                    {supplierName}
                                </Text>
                                {!!supplierEmail && (
                                    <Text
                                        style={[
                                            styles.contactSecondary,
                                            {color: theme.textSecondary},
                                        ]}>
                                        {supplierEmail}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* ── Bento Grid ── */}
                    <View style={styles.bentoRow}>
                        <View
                            style={[
                                styles.bentoLeft,
                                {
                                    backgroundColor: theme.commonBgColor,
                                    borderColor: theme.commonBorderColor,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.bentoLabel,
                                    {color: theme.textSecondary},
                                ]}>
                                Aging Analysis
                            </Text>
                            <View style={styles.barChart}>
                                {agingBuckets.map(b => (
                                    <View key={b.label} style={styles.barCol}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    height:
                                                        BAR_MAX_H * b.heightPct,
                                                    backgroundColor: b.color,
                                                },
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.barLabel,
                                                {color: theme.textSecondary},
                                            ]}>
                                            {b.label}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View
                            style={[
                                styles.bentoRight,
                                {
                                    backgroundColor: theme.commonBgColor,
                                    borderColor: theme.commonBorderColor,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.bentoLabel,
                                    {color: theme.textSecondary},
                                ]}>
                                Spend Trend
                            </Text>
                            <View style={styles.barChart}>
                                {spendData.map((v, i) => (
                                    <View key={i} style={styles.barCol}>
                                        <View
                                            style={[
                                                styles.bar,
                                                {
                                                    height: BAR_MAX_H * v,
                                                    backgroundColor:
                                                        theme.buttonColor +
                                                        Math.round(
                                                            (0.15 + i * 0.13) *
                                                                255,
                                                        )
                                                            .toString(16)
                                                            .padStart(2, '0'),
                                                },
                                            ]}
                                        />
                                    </View>
                                ))}
                            </View>
                            <Text
                                style={[
                                    styles.revSubLabel,
                                    {color: theme.textSecondary},
                                ]}>
                                Last 6 Months
                            </Text>
                        </View>
                    </View>

                    {/* ── Recent Activity ── */}
                    <View style={styles.section}>
                        <View style={styles.activityHeader}>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    {color: theme.buttonColor},
                                ]}>
                                Recent Activity
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={[
                                        styles.viewAll,
                                        {color: theme.buttonColor},
                                    ]}>
                                    View All
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {activities.map((a, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.activityRow,
                                    {
                                        opacity: a.opacity,
                                        backgroundColor: theme.commonBgColor,
                                        borderColor: theme.commonBorderColor,
                                    },
                                ]}>
                                <View
                                    style={[
                                        styles.activityIconWrap,
                                        {
                                            backgroundColor:
                                                theme.selectedItemBgColor,
                                        },
                                    ]}>
                                    <Icon
                                        name={a.icon}
                                        size={scale(18)}
                                        color={theme.buttonColor}
                                    />
                                </View>
                                <View style={styles.activityTextCol}>
                                    <Text
                                        style={[
                                            styles.activityTitle,
                                            {color: theme.textPrimary},
                                        ]}>
                                        {a.title}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.activityTime,
                                            {color: theme.textSecondary},
                                        ]}>
                                        {a.time}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.activityAmount,
                                        {color: a.amountColor},
                                    ]}>
                                    {a.amount}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.bottomSpacer} />
                </ScrollView>

                <Loader visible={isLoading} />
            </AppContainer>
        </LinearGradient>
    );
};

export default SupplierProfile;
